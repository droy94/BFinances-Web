import { Contractor } from "../../model/contractor";
export interface Expense {
  id: number;
  name: string;
  expenseNo: string;
  fromContractor: Contractor;
  expenseDate: Date;
  dueDate: Date;
  vatAmount: number;
  netAmount: number;
  grossAmount: number;
  vatPercent: number;
}
