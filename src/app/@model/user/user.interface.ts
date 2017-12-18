export interface User {
  _id?: any,
  username: string,
  email: string,
  isEmailVerify?: boolean,
  avatar?: string,
  admin?: boolean,
  ban?: string,
  yggdrasil?: {
    username: string,
    uuid: string,
  };
  accounts?: any,
}
