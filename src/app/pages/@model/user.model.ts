export class UserModel {
  _id?: any;
  username: string;
  email: string;
  isEmailVerify?: boolean;
  avatar?: string;
  admin?: boolean;
  ban?: string;
  yggdrasil?: {
    username: string,
    uuid: string,
  };
  accounts?: {
    [key: string]: IUserAccount,
  };
}

export const EmptyUser = {
  _id: null,
  username: 'default',
  email: 'default@email.com',
  isEmailVerify: false,
  avatar: '/assets/images/avatar/default.jpg',
  admin: false,
  ban: null,
  yggdrasil: {
    username: 'default',
    uuid: null,
  },
};

interface IUserAccount {
  uid: string;
  name?: string;
  avatar?: string;
  accessToken: string;
  expires: Date;
}
