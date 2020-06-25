import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Invoice } from "../model/invoice";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class InvoiceService {
  private invoicesUrl = "http://localhost:5000/api/invoices";

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  constructor(private httpClient: HttpClient) {}

  getInvoices(): Observable<Invoice[]> {
    return this.httpClient.get<Invoice[]>(this.invoicesUrl);
  }

  addInvoice(invoice: Invoice) {
    return this.httpClient.post<Invoice>(
      this.invoicesUrl,
      invoice,
      this.httpOptions
    );
  }
}
