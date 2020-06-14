import { Pkwiu } from "./../pkwiu";
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

  possiblePkwiu: Pkwiu[] = [
    {
      id: 1,
      code: "6.2.1",
      name: "eksport produktów nieoclonych",
    },
    {
      id: 2,
      code: "6.2.2",
      name: "eksport produktów oclonych",
    },
  ];

  filtredContractors: Observable<Contractor[]>;
  filtredPkwiu: Observable<Pkwiu[]>;

  forContractorControl = new FormControl("");
  invoiceDateControl = new FormControl(null);
  dueDateControl = new FormControl(null);
  saleDateControl = new FormControl(null);
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
    grossAmount: this.grossAmountControl,
    vatPercent: this.vatPercentControl,
    numberOfUnits: this.numberOfUnitsControl,
    unitName: this.unitNameControl,
    pkwiu: this.pkwiuControl,
  });

  displayContractor(contractor: Contractor): string {
    return contractor && contractor.name ? contractor.name : "";
  }

  displayPkwiu(pkwiu: Pkwiu): string {
    return pkwiu && pkwiu.name ? pkwiu.name : "";
  }

  private _filterContractor(name: string): Contractor[] {
    const filterValue = name.toLocaleLowerCase();

    return this.possibleContractors.filter(
      (contractor) =>
        contractor.name.toLocaleLowerCase().indexOf(filterValue) === 0
    );
  }

  private _filterPkwiu(name: string): Pkwiu[] {
    const filterValue = name.toLocaleLowerCase();

    return this.possiblePkwiu.filter(
      (pkwiu) => pkwiu.name.toLocaleLowerCase().indexOf(filterValue) === 0
    );
  }
}
