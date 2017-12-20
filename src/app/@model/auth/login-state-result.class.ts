import {LoginStateResultUser} from './login-state-result-user.interface';

export class LoginStateResult {
  isLogin: boolean;
  user: LoginStateResultUser;
  error?: string;
}
