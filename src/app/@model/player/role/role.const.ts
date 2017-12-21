import {DefaultUser} from '../../user/user.const';
import {Role} from './role.interface';

export const DefaultRole: Role = {
  _id: null,
  rolename: 'default',
  uuid: null,
  user: DefaultUser,
  isDefault: false,
  userModel: 'alex',
  skin: '/assets/images/skin/default.png',
  cape: null,
};
