import { Pkwiu } from "./pkwiu";

export interface InvoiceItem {
  id: number;
  serviceName: string;
  netUnitAmount: number;
  netSum: number;
  vatAmountSum: number;
  grossSum: number;
  vatPercent: number;
  numberOfUnits: number;
  unitName: string;
  pkwiu: Pkwiu;
}
