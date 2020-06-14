import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { Contractor } from "../contractor";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

@Component({
  selector: "app-add-invoice",
  templateUrl: "./add-invoice.component.html",
  styleUrls: ["./add-invoice.component.scss"],
})
export class AddInvoiceComponent implements OnInit {
  possibleContractors: Contractor[] = [
    {
      id: 1,
      name: "Microsoft",
      nip: "5272830123",
    },
    {
      id: 2,
      name: "Google",
      nip: "5552830123",
    },
  ];

  filtredContractors: Observable<Contractor[]>;

  forContractorControl = new FormControl("");
  invoiceDateControl = new FormControl(null);
  dueDateControl = new FormControl("");
  saleDateControl = new FormControl("");
  netAmountControl = new FormControl("");
  grossAmountControl = new FormControl("");
  vatPercentControl = new FormControl("");
  numberOfUnitsControl = new FormControl("");
  unitNameControl = new FormControl("");
  pkwiuControl = new FormControl("");

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.filtredContractors = this.forContractorControl.valueChanges.pipe(
      startWith(""),
      map((value) => (typeof value === "string" ? value : value.name)),
      map((name) =>
        name ? this._filter(name) : this.possibleContractors.slice()
      )
    );
  }

  addInvoiceForm = this.formBuilder.group({
    forContractor: this.forContractorControl,
    invoiceDate: this.invoiceDateControl,
    dueDate: this.dueDateControl,
    saleDate: this.saleDateControl,
    netAmount: this.netAmountControl,
    grossAmount: this.grossAmountControl,
    vatPercent: this.vatPercentControl,
    numberOfUnits: this.numberOfUnitsControl,
    unitName: this.unitNameControl,
    pkwiu: this.pkwiuControl,
  });

  displayContractor(contractor: Contractor): string {
    return contractor && contractor.name ? contractor.name : "";
  }

  private _filter(name: string): Contractor[] {
    const filterValue = name.toLocaleLowerCase();

    return this.possibleContractors.filter(
      (contractor) =>
        contractor.name.toLocaleLowerCase().indexOf(filterValue) === 0
    );
  }
}
