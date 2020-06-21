import { Pkwiu } from "./pkwiu";
import { Contractor } from "./contractor";
export interface Invoice {
  id: number;
  number: string;
  forContractor: Contractor;
  invoiceDate: Date;
  dueDate: Date;
  saleDate: Date;
  netAmount: number;
  vatPercent: number;
  numberOfUnits: number;
  unitName: string;
  pkwiu: Pkwiu;
}
