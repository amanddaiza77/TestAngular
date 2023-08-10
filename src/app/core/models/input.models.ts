export class taxData {
  filingType?: String;
  month?: String;
  year?: String;
  saleAmount?: number;
  taxAmount?: number;
  surcharge?: number;
  penalty?: number;
  totalAmount?: number;

  constructor()
  constructor(obj: any)
  constructor(obj?: any) {
    if (obj) {
      this.filingType = obj.filingType
      this.month = obj.month
      this.year = obj.year
      this.saleAmount = obj.saleAmount
      this.taxAmount = obj.taxAmount
      this.surcharge = obj.surcharge
      this.penalty = obj.penalty
      this.totalAmount = obj.totalAmount
    }
  }
}