import { PkwiuService } from "../services/pkwiu.service";
import { Pkwiu } from "../model/pkwiu";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { Contractor } from "../model/contractor";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { ContractorService } from "../services/contractor.service";
import { Invoice } from "../model/invoice";
import { InvoiceService } from "../services/invoice.service";

@Component({
  selector: "app-add-invoice",
  templateUrl: "./add-invoice.component.html",
  styleUrls: ["./add-invoice.component.scss"],
})
export class AddInvoiceComponent implements OnInit {
  possibleContractors: Contractor[] = [];
  possiblePkwiu: Pkwiu[] = [];

  filtredContractors: Observable<Contractor[]>;
  filtredPkwiu: Observable<Pkwiu[]>;

  forContractorControl = new FormControl("");
  invoiceDateControl = new FormControl(null);
  dueDateControl = new FormControl(null);
  saleDateControl = new FormControl(null);
  netAmountControl = new FormControl("");
  vatPercentControl = new FormControl("");
  numberOfUnitsControl = new FormControl("");
  unitNameControl = new FormControl("");
  pkwiuControl = new FormControl("");

  constructor(
    private contractorService: ContractorService,
    private pkwiuService: PkwiuService,
    private formBuilder: FormBuilder,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit() {
    this.getContractors();
    this.getPkwiu();

    this.filtredContractors = this.forContractorControl.valueChanges.pipe(
      startWith(""),
      map((value) => (typeof value === "string" ? value : value.name)),
      map((name) =>
        name ? this._filterContractor(name) : this.possibleContractors.slice()
      )
    );

    this.filtredPkwiu = this.pkwiuControl.valueChanges.pipe(
      startWith(""),
      map((value) => (typeof value === "string" ? value : value.name)),
      map((name) =>
        name ? this._filterPkwiu(name) : this.possiblePkwiu.slice()
      )
    );
  }

  addInvoiceForm = this.formBuilder.group({
    forContractor: this.forContractorControl,
    invoiceDate: this.invoiceDateControl,
    dueDate: this.dueDateControl,
    saleDate: this.saleDateControl,
    netAmount: this.netAmountControl,
    vatPercent: this.vatPercentControl,
    numberOfUnits: this.numberOfUnitsControl,
    unitName: this.unitNameControl,
    pkwiu: this.pkwiuControl,
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

  addInvoice() {
    const invoice = this.mapInvoice();

    this.invoiceService
      .addInvoice(invoice)
      .subscribe(() => alert("Invoice created successfully"));
  }

  private mapInvoice(): Invoice {
    const invoice: Invoice = {
      id: 0,
      number: null,
      forContractor: this.addInvoiceForm.get("forContractor").value,
      invoiceDate: this.addInvoiceForm.get("invoiceDate").value,
      dueDate: this.addInvoiceForm.get("dueDate").value,
      saleDate: this.addInvoiceForm.get("saleDate").value,
      netAmount: Number(this.addInvoiceForm.get("netAmount").value),
      vatPercent: Number(this.addInvoiceForm.get("vatPercent").value),
      numberOfUnits: Number(this.addInvoiceForm.get("numberOfUnits").value),
      unitName: this.addInvoiceForm.get("unitName").value,
      pkwiu: this.addInvoiceForm.get("pkwiu").value,
    };

    return invoice;
  }
}
