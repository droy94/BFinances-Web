export interface Invoice {
  id: number;
  number: string;
  fromContractor: string;
  forContractor: string;
  invoiceDate: Date;
  dueDate: Date;
  saleDate: Date;
  netAmount: number;
  grossAmount: number;
  vatPercent: number;
  numberOfUnits: number;
  unitName: string;
  pkwiu: string;
}
