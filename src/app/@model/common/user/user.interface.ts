export interface IUser {
  _id: any;
  username: string;
  email: string;
  isEmailVerify?: boolean;
  avatar?: string;
  admin?: boolean;
  ban?: string;
  yggdrasil?: {
    username: string;
    uuid: string;
  };
  accounts?: any;
}

export interface IUserExtend extends IUser {
  state: UserState;
}

export enum UserState {
  NORMAL, // 海星
  NEED_EMAIL_VALIDATION, // 需要邮件验证
  BANNED, // 被Ban了
}
