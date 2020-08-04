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

  getExpenses(): Observable<Expense[]> {
    return this.httpClient.get<Expense[]>(this.expensesUrl);
  }
}
