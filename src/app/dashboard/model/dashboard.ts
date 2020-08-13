export interface Dashboard {
  grossIncome: number;
  payableVat: number;
  payablePit: number;
  startOfSettlingPeriod: Date;
  endOfSettlingPeriod: Date;
  vatSettlementDate: Date;
  pitSettlementDate: Date;
}
