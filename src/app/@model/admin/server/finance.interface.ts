import {User} from '../../user/user.interface';

export interface Finance {
  _id?: number,
  date: string,
  type: string,
  /**
   * income,expend
   */
  accrual: number,
  balance?: number,
  comment?: string,
  user?: User;
}
