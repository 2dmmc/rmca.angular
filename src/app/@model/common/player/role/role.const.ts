import {DefaultUser} from '../../user/user.const';
import {IRole} from './role.interface';

export const DefaultRole: IRole = {
  _id: null,
  rolename: 'default',
  uuid: null,
  user: DefaultUser,
  isDefault: false,
  userModel: 'alex',
  skin: '/assets/images/skin/default.png',
  cape: null,
};
