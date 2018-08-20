import {ILoginStateResultUser} from './login-state-result-user.interface';

export class LoginStateResult {
  isLogin: boolean;
  user: ILoginStateResultUser;
  error?: string;
}
