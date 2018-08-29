import {FinanceTypeEnum} from './finance-type.enum';

export interface IFinance {
  _id?: number;
  date: string;
  type: FinanceTypeEnum;
  accrual: number;
  balance?: number;
  comment?: string;
  user?: string;
}
