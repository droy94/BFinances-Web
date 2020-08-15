import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Expense } from "../model/expense";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ExpenseService {
  private expensesUrl = "http://localhost:5000/api/expenses";

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getExpenses(month: number, year: number): Observable<Expense[]> {
    return this.httpClient.get<Expense[]>(
      `${this.expensesUrl}?month=${month}&year=${year}`
    );
  }

  addExpense(expense: Expense) {
    return this.httpClient.post<Expense>(
      this.expensesUrl,
      expense,
      this.httpOptions
    );
  }

  getExpense(id: number): Observable<Expense> {
    return this.httpClient.get<Expense>(`${this.expensesUrl}/${id}`);
  }

  editExpense(invoice: Expense, id: number) {
    return this.httpClient.put<Expense>(
      `${this.expensesUrl}/${id}`,
      invoice,
      this.httpOptions
    );
  }

  deleteExpense(id: number) {
    return this.httpClient.delete<Expense>(`${this.expensesUrl}/${id}`);
  }
}
