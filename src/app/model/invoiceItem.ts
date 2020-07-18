import { Pkwiu } from "./pkwiu";

export interface InvoiceItem {
  id: number;
  serviceName: string;
  netAmount: number;
  vatPercent: number;
  numberOfUnits: number;
  unitName: string;
  pkwiu: Pkwiu;
}
