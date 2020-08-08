import { ExpenseService } from "./../services/expense.service";
import { Component, OnInit } from "@angular/core";
import { Expense } from "../model/Expense";

@Component({
  selector: "app-expenses",
  templateUrl: "./expenses.component.html",
  styleUrls: ["./expenses.component.scss"],
})
export class ExpensesComponent implements OnInit {
  expenses: Expense[];
  columnsToDisplay = [
    "expenseNo",
    "name",
    "forContractor",
    "expenseDate",
    "dueDate",
    "netAmount",
    "grossAmount",
    "vatAmount",
  ];
  constructor(private expenseService: ExpenseService) {}

  ngOnInit() {
    this.getExpenses();
  }

  getExpenses() {
    this.expenseService
      .getExpenses()
      .subscribe((expenses) => (this.expenses = expenses));
  }
}
