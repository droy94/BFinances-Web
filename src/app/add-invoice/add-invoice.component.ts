import { InvoiceItem } from "./../model/invoiceItem";
import { PkwiuService } from "../services/pkwiu.service";
import { Pkwiu } from "../model/pkwiu";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormArray,
  AbstractControl,
} from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { Contractor } from "../model/contractor";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { ContractorService } from "../services/contractor.service";
import { Invoice } from "../model/invoice";
import { InvoiceService } from "../services/invoice.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-add-invoice",
  templateUrl: "./add-invoice.component.html",
  styleUrls: ["./add-invoice.component.scss"],
})
export class AddInvoiceComponent implements OnInit {
  public invoiceId: number;
  possibleContractors: Contractor[] = [];
  possiblePkwiu: Pkwiu[] = [];
  filtredContractors: Observable<Contractor[]>;
  filtredPkwiu: Array<Observable<Pkwiu[]>> = [];
  itemsControl = new FormArray([]);

  addInvoiceForm = this.formBuilder.group({
    forContractor: [""],
    invoiceDate: [""],
    dueDate: [""],
    saleDate: [""],
    dueDays: [""],
    vatSum: [""],
    netSum: [""],
    grossSum: [""],
    items: this.itemsControl,
  });

  constructor(
    private contractorService: ContractorService,
    private pkwiuService: PkwiuService,
    private formBuilder: FormBuilder,
    private invoiceService: InvoiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.invoiceId = +params.get("id");
    });

    this.getContractors();
    this.getPkwiu();

    this.filtredContractors = this.addInvoiceForm
      .get("forContractor")
      .valueChanges.pipe(
        startWith(""),
        map((value) => (typeof value === "string" ? value : value.name)),
        map((name) =>
          name ? this._filterContractor(name) : this.possibleContractors.slice()
        )
      );

    if (this.invoiceId) {
      this.invoiceService
        .getInvoice(this.invoiceId)
        .subscribe((invoice) => this.fulfillInvoiceForm(invoice));
    }
  }

  addPkwiuFilter(pkwiuField: AbstractControl) {
    this.filtredPkwiu.push(
      pkwiuField.valueChanges.pipe(
        startWith(""),
        map((value) => (typeof value === "string" ? value : value.name)),
        map((name) =>
          name ? this._filterPkwiu(name) : this.possiblePkwiu.slice()
        )
      )
    );
  }

  removePkwiuFilter(index: number) {
    this.filtredPkwiu.splice(index, 1);
  }

  displayContractor(contractor: Contractor): string {
    return contractor && contractor.name ? contractor.name : "";
  }

  displayPkwiu(pkwiu: Pkwiu): string {
    return pkwiu && pkwiu.code ? pkwiu.code : "";
  }

  private _filterContractor(name: string): Contractor[] {
    const filterValue = name.toLocaleLowerCase();

    return this.possibleContractors.filter(
      (contractor) =>
        contractor.name.toLocaleLowerCase().indexOf(filterValue) === 0
    );
  }

  private _filterPkwiu(code: string): Pkwiu[] {
    const filterValue = code.toLocaleLowerCase();

    return this.possiblePkwiu.filter(
      (pkwiu) => pkwiu.code.toLocaleLowerCase().indexOf(filterValue) === 0
    );
  }

  getContractors() {
    this.contractorService
      .getContractors()
      .subscribe((contractors) => (this.possibleContractors = contractors));
  }

  getPkwiu() {
    this.pkwiuService
      .getPkwiu()
      .subscribe((pkwiu) => (this.possiblePkwiu = pkwiu));
  }

  onSubmit() {
    if (this.invoiceId) {
      this.invoiceService
        .getInvoice(this.invoiceId)
        .subscribe(() => this.editInvoice(this.invoiceId));
    } else {
      this.addInvoice();
    }
  }

  editInvoice(invoiceId: number) {
    const invoice = this.mapInvoice();

    this.invoiceService
      .editInvoice(invoice, invoiceId)
      .subscribe(() => this.router.navigate(["/invoices"]));
  }

  addInvoice() {
    const invoice = this.mapInvoice();

    this.invoiceService
      .addInvoice(invoice)
      .subscribe(() => this.router.navigate(["/invoices"]));
  }

  onDeleteInvoice() {
    if (this.invoiceId) {
      this.invoiceService
        .deleteInvoice(this.invoiceId)
        .subscribe(() => this.router.navigate(["/invoices"]));
    }
  }

  onDeleteItem(item: FormGroup) {
    let index = this.itemsControl.controls.indexOf(item);
    this.itemsControl.removeAt(index);
    this.removePkwiuFilter(index);
  }

  onGenerateInvoice() {
    this.invoiceService.generateInvoice(this.invoiceId).subscribe((result) => {
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(result);
      link.download = "invoice";
      link.click();
    });
  }

  private mapInvoice(): Invoice {
    const invoice: Invoice = {
      id: 0,
      invoiceNo: null,
      forContractor: this.addInvoiceForm.get("forContractor").value,
      invoiceDate: this.addInvoiceForm.get("invoiceDate").value,
      dueDate: this.addInvoiceForm.get("dueDate").value,
      saleDate: this.addInvoiceForm.get("saleDate").value,
      dueDays: Number(this.addInvoiceForm.get("dueDays").value),
      vatSum: Number(this.addInvoiceForm.get("vatSum").value),
      netSum: Number(this.addInvoiceForm.get("netSum").value),
      grossSum: Number(this.addInvoiceForm.get("grossSum").value),
      items: this.mapItems(),
    };

    return invoice;
  }

  private mapItems(): InvoiceItem[] {
    let items: InvoiceItem[] = [];

    for (let i = 0; i < this.itemsControl.length; i++) {
      items.push({
        id: Number(this.itemsControl.at(i).get("id").value),
        serviceName: this.itemsControl.at(i).get("serviceName").value,
        netUnitAmount: Number(
          this.itemsControl.at(i).get("netUnitAmount").value
        ),
        vatPercent: Number(this.itemsControl.at(i).get("vatPercent").value),
        netSum: Number(this.itemsControl.at(i).get("netSum").value),
        vatAmountSum: Number(this.itemsControl.at(i).get("vatAmountSum").value),
        grossSum: Number(this.itemsControl.at(i).get("grossSum").value),
        numberOfUnits: Number(
          this.itemsControl.at(i).get("numberOfUnits").value
        ),
        unitName: this.itemsControl.at(i).get("unitName").value,
        pkwiu: this.itemsControl.at(i).get("pkwiu").value,
      } as InvoiceItem);
    }
    return items;
  }

  fulfillInvoiceForm(invoice: Invoice) {
    this.addInvoiceForm.patchValue({
      forContractor: invoice.forContractor,
      invoiceDate: invoice.invoiceDate,
      dueDate: invoice.dueDate,
      saleDate: invoice.saleDate,
    });
    invoice.items.forEach((item) => {
      this.onAddItem(item);
    });
  }

  onAddItem(invoiceItem: InvoiceItem) {
    let item = new FormGroup({
      id: new FormControl(""),
      serviceName: new FormControl(""),
      netUnitAmount: new FormControl(""),
      netSum: new FormControl(""),
      vatAmountSum: new FormControl(""),
      grossSum: new FormControl(""),
      vatPercent: new FormControl(""),
      numberOfUnits: new FormControl(""),
      unitName: new FormControl(""),
      pkwiu: new FormControl(""),
    });

    if (invoiceItem) {
      item.patchValue({
        id: invoiceItem.id,
        serviceName: invoiceItem.serviceName,
        netSum: invoiceItem.netSum,
        vatAmountSum: invoiceItem.vatAmountSum,
        grossSum: invoiceItem.grossSum,
        netUnitAmount: invoiceItem.netUnitAmount,
        vatPercent: invoiceItem.vatPercent,
        numberOfUnits: invoiceItem.numberOfUnits,
        unitName: invoiceItem.unitName,
        pkwiu: invoiceItem.pkwiu,
      });
    }

    this.itemsControl.push(item);
    this.addPkwiuFilter(item.get("pkwiu"));
  }
}
