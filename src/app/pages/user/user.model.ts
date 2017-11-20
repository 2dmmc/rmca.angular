export interface User {
  _id: string;
  username: string;
  email: string;
  admin?: boolean;
  role?: string[];
  ban?: string;
  yggdrasil?: {
    username: string,
    uuid: string,
  };
}
