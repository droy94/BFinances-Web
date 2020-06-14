import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Invoice } from "./invoice";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class InvoiceService {
  private invoicesUrl = "http://localhost:5000/api/invoices";

  constructor(private httpClient: HttpClient) {}

  getInvoices(): Observable<Invoice[]> {
    return this.httpClient.get<Invoice[]>(this.invoicesUrl);
  }
}
