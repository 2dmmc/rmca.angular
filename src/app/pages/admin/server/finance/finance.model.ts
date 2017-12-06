import {UserModel} from '../../../user/user.model';

export class FinanceModel {
  _id?: number;
  date: Date;
  type: string;
  /**
   * income,expend
   */
  accrual: number;
  balance?: number;
  comment?: string;
  user?: UserModel;
}
