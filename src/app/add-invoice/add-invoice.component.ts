import { InvoiceItem } from "./../model/invoiceItem";
import { PkwiuService } from "../services/pkwiu.service";
import { Pkwiu } from "../model/pkwiu";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, FormArray } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { Contractor } from "../model/contractor";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { ContractorService } from "../services/contractor.service";
import { Invoice } from "../model/invoice";
import { InvoiceService } from "../services/invoice.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-add-invoice",
  templateUrl: "./add-invoice.component.html",
  styleUrls: ["./add-invoice.component.scss"],
})
export class AddInvoiceComponent implements OnInit {
  public invoiceId: number;
  possibleContractors: Contractor[] = [];
  // possiblePkwiu: Pkwiu[] = [];

  filtredContractors: Observable<Contractor[]>;
  // filtredPkwiu: Observable<Pkwiu[]>;

  // forContractorControl = new FormControl("");
  // invoiceDateControl = new FormControl(null);
  // dueDateControl = new FormControl(null);
  // saleDateControl = new FormControl(null);
  // dueDaysControl = new FormControl(null);
  // netSumControl = new FormControl(null);
  itemsControl = new FormArray([]);
  // pkwiuControl = new FormControl("");

  constructor(
    private contractorService: ContractorService,
    private pkwiuService: PkwiuService,
    private formBuilder: FormBuilder,
    private invoiceService: InvoiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.invoiceId = +params.get("id");
    });

    this.getContractors();
    // this.getPkwiu();

    this.filtredContractors = this.addInvoiceForm
      .get("forContractor")
      .valueChanges.pipe(
        startWith(""),
        map((value) => (typeof value === "string" ? value : value.name)),
        map((name) =>
          name ? this._filterContractor(name) : this.possibleContractors.slice()
        )
      );

    // this.filtredPkwiu = this.pkwiuControl.valueChanges.pipe(
    //   startWith(""),
    //   map((value) => (typeof value === "string" ? value : value.name)),
    //   map((name) =>
    //     name ? this._filterPkwiu(name) : this.possiblePkwiu.slice()
    //   )
    // );

    if (this.invoiceId) {
      this.invoiceService
        .getInvoice(this.invoiceId)
        .subscribe((invoice) => this.fulfillInvoiceForm(invoice));
    }
  }

  addInvoiceForm = this.formBuilder.group({
    forContractor: [""],
    invoiceDate: [""],
    dueDate: [""],
    saleDate: [""],
    dueDays: [""],
    netSum: [""],
    items: this.itemsControl,
    // pkwiu: this.pkwiuControl,
  });

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

  // private _filterPkwiu(code: string): Pkwiu[] {
  //   const filterValue = code.toLocaleLowerCase();

  //   return this.possiblePkwiu.filter(
  //     (pkwiu) => pkwiu.code.toLocaleLowerCase().indexOf(filterValue) === 0
  //   );
  // }

  getContractors() {
    this.contractorService
      .getContractors()
      .subscribe((contractors) => (this.possibleContractors = contractors));
  }

  // getPkwiu() {
  //   this.pkwiuService
  //     .getPkwiu()
  //     .subscribe((pkwiu) => (this.possiblePkwiu = pkwiu));
  // }

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
      .subscribe(() => alert("Invoice edited successfully"));
  }

  addInvoice() {
    const invoice = this.mapInvoice();

    this.invoiceService
      .addInvoice(invoice)
      .subscribe(() => alert("Invoice created successfully"));
  }

  deleteInvoice() {
    if (this.invoiceId) {
      this.invoiceService
        .deleteInvoice(this.invoiceId)
        .subscribe(() => alert("Invoice deleted successfully"));
    }
  }

  onDeleteItem(item: FormGroup) {
    let itemId = item.get("id").value;

    this.invoiceService
      .deleteItem(itemId)
      .subscribe(() => this.deleteItem(itemId));
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
      netSum: Number(this.addInvoiceForm.get("netSum").value),
      items: this.mapItems(),
      // pkwiu: this.addInvoiceForm.get("pkwiu").value,
    };

    return invoice;
  }

  private mapItems(): InvoiceItem[] {
    let items: InvoiceItem[] = [];

    for (let i = 0; i < this.itemsControl.length; i++) {
      items.push({
        id: Number(this.itemsControl.at(i).get("id").value),
        serviceName: this.itemsControl.at(i).get("serviceName").value,
        netAmount: Number(this.itemsControl.at(i).get("netAmount").value),
        vatPercent: Number(this.itemsControl.at(i).get("vatPercent").value),
        numberOfUnits: Number(
          this.itemsControl.at(i).get("numberOfUnits").value
        ),
        unitName: this.itemsControl.at(i).get("unitName").value,
        pkwiu: null,
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
      // pkwiu: invoice.pkwiu,
    });
    invoice.items.forEach((item) => {
      this.addItem(item);
    });
  }

  addItem(invoiceItem: InvoiceItem) {
    let item = new FormGroup({
      id: new FormControl(""),
      serviceName: new FormControl(""),
      netAmount: new FormControl(""),
      vatPercent: new FormControl(""),
      numberOfUnits: new FormControl(""),
      unitName: new FormControl(""),
      // pkwiu: new FormControl(""),
    });

    if (invoiceItem) {
      item.patchValue({
        id: invoiceItem.id,
        serviceName: invoiceItem.serviceName,
        netAmount: invoiceItem.netAmount,
        vatPercent: invoiceItem.vatPercent,
        numberOfUnits: invoiceItem.numberOfUnits,
        unitName: invoiceItem.unitName,
      });
    }

    this.itemsControl.push(item);
  }

  deleteItem(itemId: number) {
    this.itemsControl.removeAt(
      this.itemsControl.value.findIndex((item) => item.id === itemId)
    );
  }
}
