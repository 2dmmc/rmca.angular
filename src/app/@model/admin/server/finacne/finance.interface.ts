export interface Finance {
  _id?: number,
  date: string,
  type: string,
  accrual: number,
  balance?: number,
  comment?: string,
  user?: string;
}
