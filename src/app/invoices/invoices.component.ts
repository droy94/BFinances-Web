import { InvoiceService } from "../services/invoice.service";
import { Component, OnInit } from "@angular/core";
import { Invoice } from "../model/invoice";

@Component({
  selector: "app-invoices",
  templateUrl: "./invoices.component.html",
  styleUrls: ["./invoices.component.scss"],
})
export class InvoicesComponent implements OnInit {
  monthDropdownModel: number[];
  yearDropdownModel: number[];
  selectedMonth: number;
  selectedYear: number;

  invoices: Invoice[];
  columnsToDisplay = [
    "invoiceNo",
    "forContractor",
    "invoiceDate",
    "dueDate",
    "netSum",
    "grossSum",
    "vatSum",
  ];

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit() {
    this.getInvoices();

    this.monthDropdownModel = Array.from(Array(12), (_, i) => i + 1);
    this.yearDropdownModel = [2019, 2020];
  }

  getInvoices() {
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

    this.invoiceService
      .getInvoices(month, year)
      .subscribe((invoices) => (this.invoices = invoices));
  }
}
