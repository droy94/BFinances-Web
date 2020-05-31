import { INVOICES } from "./mock-invoices";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Invoice } from "./invoice";

@Injectable({
  providedIn: "root",
})
export class InvoiceService {
  constructor() {}

  getInvoices(): Observable<Invoice[]> {
    return of(INVOICES);
  }
}
