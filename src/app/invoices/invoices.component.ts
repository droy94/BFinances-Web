import { InvoiceService } from "./../invoice.service";
import { Component, OnInit } from "@angular/core";
import { Invoice } from "../invoice";

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
