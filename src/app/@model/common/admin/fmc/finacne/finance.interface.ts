export interface IFinanceResponse {
  _id?: string;
  date: string;
  type: FinanceType;
  accrual: number;
  balance: number;
  comment?: string;
  user?: IUserFinance;
}

export interface IFinanceRequest {
  _id?: string;
  date: string;
  type: FinanceType;
  accrual: number;
  comment?: string;
  userId?: string;
}

export enum FinanceType {
  'income',
  'expend',
}

export interface IUserFinance {
  _id?: string;
  username: string;
}
