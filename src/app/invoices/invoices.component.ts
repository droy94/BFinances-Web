import { InvoiceService } from "../services/invoice.service";
import { Component, OnInit } from "@angular/core";
import { Invoice } from "../model/invoice";

@Component({
  selector: "app-invoices",
  templateUrl: "./invoices.component.html",
  styleUrls: ["./invoices.component.scss"],
})
export class InvoicesComponent implements OnInit {
  invoices: Invoice[];
  columnsToDisplay = [
    "number",
    "forContractor",
    "invoiceDate",
    "dueDate",
    "netAmount",
    "vatPercent",
    "pkwiu",
  ];

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit() {
    this.getInvoices();
  }

  getInvoices() {
    this.invoiceService
      .getInvoices()
      .subscribe((invoices) => (this.invoices = invoices));
  }
}
