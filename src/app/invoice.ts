export interface Invoice {
  id: number;
  no: string;
  fromContractor: string;
  forContractor: string;
  invoiceDate: Date;
  dueDate: Date;
  saleDate: Date;
  netAmount: number;
  grossAmount: number;
  vatPercent: number;
  numberOfUnits: number;
  unit: string;
  pkwiu: string;
}
