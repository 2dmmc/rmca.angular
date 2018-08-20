import {IUser} from '../user/user.interface';

export interface ILoginStateResultUser extends IUser {
  impersonate?: boolean;
}
