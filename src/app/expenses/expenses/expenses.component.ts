import { ExpenseService } from "./../services/expense.service";
import { Component, OnInit } from "@angular/core";
import { Expense } from "../model/Expense";

@Component({
  selector: "app-expenses",
  templateUrl: "./expenses.component.html",
  styleUrls: ["./expenses.component.scss"],
})
export class ExpensesComponent implements OnInit {
  monthDropdownModel: number[];
  yearDropdownModel: number[];
  selectedMonth: number;
  selectedYear: number;

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

    this.monthDropdownModel = Array.from(Array(12), (_, i) => i + 1);
    this.yearDropdownModel = [2019, 2020];
  }

  getExpenses() {
    let today = new Date();
    let month: number;
    let year: number;

    if (!this.selectedMonth || !this.selectedYear) {
      month = today.getMonth() + 1;
      year = today.getFullYear();
    } else {
      month = this.selectedMonth;
      year = this.selectedYear;
    }

    this.expenseService
      .getExpenses(month, year)
      .subscribe((expenses) => (this.expenses = expenses));
  }
}
