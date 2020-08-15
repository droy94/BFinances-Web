import { ExpenseService } from "../../services/expense.service";
import { Component, OnInit } from "@angular/core";
import { Contractor } from "src/app/model/contractor";
import { Observable } from "rxjs/internal/Observable";
import { FormBuilder } from "@angular/forms";
import { ContractorService } from "src/app/services/contractor.service";
import { ActivatedRoute, Router } from "@angular/router";
import { startWith, map } from "rxjs/operators";
import { Expense } from "../../model/expense";

@Component({
  selector: "app-add-expense",
  templateUrl: "./add-expense.component.html",
  styleUrls: ["./add-expense.component.scss"],
})
export class AddExpenseComponent implements OnInit {
  public expenseId: number;
  possibleContractors: Contractor[] = [];
  filtredContractors: Observable<Contractor[]>;

  addExpenseForm = this.formBuilder.group({
    name: [""],
    fromContractor: [""],
    expenseDate: [""],
    dueDate: [""],
    vatAmount: [""],
    netAmount: [""],
    grossAmount: [""],
    vatPercent: [""],
  });

  constructor(
    private contractorService: ContractorService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private expenseService: ExpenseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.expenseId = +params.get("id");
    });

    this.getContractors();

    this.filtredContractors = this.addExpenseForm
      .get("fromContractor")
      .valueChanges.pipe(
        startWith(""),
        map((value) => (typeof value === "string" ? value : value.name)),
        map((name) =>
          name ? this._filterContractor(name) : this.possibleContractors.slice()
        )
      );

    if (this.expenseId) {
      this.expenseService
        .getExpense(this.expenseId)
        .subscribe((expense) => this.fulfillExpenseForm(expense));
    }
  }

  getContractors() {
    this.contractorService
      .getContractors()
      .subscribe((contractors) => (this.possibleContractors = contractors));
  }

  private _filterContractor(name: string): Contractor[] {
    const filterValue = name.toLocaleLowerCase();

    return this.possibleContractors.filter(
      (contractor) =>
        contractor.name.toLocaleLowerCase().indexOf(filterValue) === 0
    );
  }

  fulfillExpenseForm(expense: Expense) {
    this.addExpenseForm.patchValue({
      name: expense.name,
      fromContractor: expense.fromContractor,
      expenseDate: expense.expenseDate,
      dueDate: expense.dueDate,
      netAmount: expense.netAmount,
      vatPercent: expense.vatPercent,
    });
  }

  displayContractor(contractor: Contractor): string {
    return contractor && contractor.name ? contractor.name : "";
  }

  onSubmit() {
    if (this.expenseId) {
      this.expenseService
        .getExpense(this.expenseId)
        .subscribe(() => this.editExpense(this.expenseId));
    } else {
      this.addExpense();
    }
  }

  private mapExpense(): Expense {
    const expense: Expense = {
      id: 0,
      name: this.addExpenseForm.get("name").value,
      expenseNo: null,
      fromContractor: this.addExpenseForm.get("fromContractor").value,
      expenseDate: this.addExpenseForm.get("expenseDate").value,
      dueDate: this.addExpenseForm.get("dueDate").value,
      vatAmount: Number(this.addExpenseForm.get("vatAmount").value),
      netAmount: Number(this.addExpenseForm.get("netAmount").value),
      grossAmount: Number(this.addExpenseForm.get("grossAmount").value),
      vatPercent: Number(this.addExpenseForm.get("vatPercent").value),
    };

    return expense;
  }

  addExpense() {
    const expense = this.mapExpense();

    this.expenseService
      .addExpense(expense)
      .subscribe(() => this.router.navigate(["/expenses"]));
  }

  editExpense(expenseId: number) {
    const expense = this.mapExpense();

    this.expenseService
      .editExpense(expense, expenseId)
      .subscribe(() => this.router.navigate(["/expenses"]));
  }

  onDeleteExpense() {
    if (this.expenseId) {
      this.expenseService
        .deleteExpense(this.expenseId)
        .subscribe(() => this.router.navigate(["/expenses"]));
    }
  }
}
