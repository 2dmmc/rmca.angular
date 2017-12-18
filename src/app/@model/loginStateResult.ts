import {LoginStateResultUser} from './user/auth/login-state-result.interface';

export class LoginStateResult {
  isLogin: boolean;
  user: LoginStateResultUser;
}
