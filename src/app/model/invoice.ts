import { InvoiceItem } from "./invoiceItem";
import { Contractor } from "./contractor";
export interface Invoice {
  id: number;
  invoiceNo: string;
  forContractor: Contractor;
  invoiceDate: Date;
  dueDate: Date;
  saleDate: Date;
  dueDays: number;
  netSum: number;
  items: InvoiceItem[];
}
