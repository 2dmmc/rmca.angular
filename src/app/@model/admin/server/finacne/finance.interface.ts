import {User} from '../../../user/user.interface';
import {FinanceType} from "./finance-type.enum";

export interface Finance {
  _id?: number,
  date: string,
  type: FinanceType,
  /**
   * income,expend
   */
  accrual: number,
  balance?: number,
  comment?: string,
  user?: User;
}
