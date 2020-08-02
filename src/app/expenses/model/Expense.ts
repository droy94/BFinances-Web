import { Contractor } from "../../model/contractor";
export interface Invoice {
  id: number;
  name: string;
  expenseNo: string;
  forContractor: Contractor;
  expenseDate: Date;
  dueDate: Date;
  vatAmount: number;
  netAmount: number;
  grossSum: number;
  vatPercent: number;
}
