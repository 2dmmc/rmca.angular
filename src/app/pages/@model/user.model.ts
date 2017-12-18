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
  accounts?: any;
  impersonate?: boolean;
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
  accounts: {
    gravatar: {
      avatar: '/assets/images/avatar/default.jpg',
    },
    qq: {
      avatar: '/assets/images/avatar/default.jpg',
      expires: '1900-01-01T00:00:00.000Z',
      name: 'default',
      uid: null,
    },
    weibo: {
      avatar: '/assets/images/avatar/default.jpg',
      expires: '1900-01-01T00:00:00.000Z',
      name: 'default',
      uid: null,
    },
  },
};
