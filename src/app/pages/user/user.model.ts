export class UserModel {
  _id: any;
  username: string;
  email: string;
  isEmailVerify: boolean;
  avatar?: string;
  role?: string;
  admin?: boolean;
  ban?: string;
  qq?: string;
  yggdrasil?: {
    username: string,
    uuid: string,
  };
  accounts?: {
    [key: string]: IUserAccount,
  };
}

interface IUserAccount {
  uid: string;
  name?: string;
  avatar?: string;
  accessToken: string;
  expires: Date;
}
