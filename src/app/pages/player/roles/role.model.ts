import {UserModel} from '../../user/user.model';

export class RoleModel {
  _id: any;
  rolename: string;
  uuid: string;
  user: UserModel;
  isDefault: boolean;
  userModel: 'alex' | 'steve';
}
