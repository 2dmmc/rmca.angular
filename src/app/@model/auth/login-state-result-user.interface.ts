import {User} from '../user/user.interface';

export interface LoginStateResultUser extends User {
  impersonate?: boolean,
}
