import {FinanceTypeEnum} from './finance-type.enum';

export interface Finance {
  _id?: number,
  date: string,
  type: FinanceTypeEnum,
  /**
   * income,expend
   */
  accrual: number,
  balance?: number,
  comment?: string,
  user?: string;
}
