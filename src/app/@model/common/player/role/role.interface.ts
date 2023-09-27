import {IUser} from '../../user/user.interface';

export interface IRole {
  _id: any;
  rolename: string;
  uuid: string;
  user: IUser;
  isDefault: boolean;
  userModel: IRoleUserSkinModelEnum;
  // 前端抽象的字段, 后端不直接提供, 需要拼接. 但基础模型需要填充default数据, 这里抽象了skin字段
  skin?: string;
  cape?: string;
}

export enum IRoleUserSkinModelEnum {
  alex,
  steve,
}
