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

  pdfOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/pdf",
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getInvoices(): Observable<Invoice[]> {
    return this.httpClient.get<Invoice[]>(this.invoicesUrl);
  }

  getInvoice(id: number): Observable<Invoice> {
    return this.httpClient.get<Invoice>(`${this.invoicesUrl}/${id}`);
  }

  addInvoice(invoice: Invoice) {
    return this.httpClient.post<Invoice>(
      this.invoicesUrl,
      invoice,
      this.httpOptions
    );
  }

  editInvoice(invoice: Invoice, id: number) {
    return this.httpClient.put<Invoice>(
      `${this.invoicesUrl}/${id}`,
      invoice,
      this.httpOptions
    );
  }

  deleteInvoice(id: number) {
    return this.httpClient.delete<Invoice>(`${this.invoicesUrl}/${id}`);
  }

  generateInvoice(id: number): Observable<any> {
    return this.httpClient.get(`${this.invoicesUrl}/generate/${id}`, {
      responseType: "blob",
    });
  }
}
