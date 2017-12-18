import {User} from '../user.interface';

export interface LoginStateResultUser extends User {
  impersonate?: boolean,
}
