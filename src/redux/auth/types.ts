import {UserModel} from '~/redux/users/types';

interface AuthOrg {
  user?: UserModel;
  token?: string;
}

export interface AuthModel extends AuthOrg {}

export interface AuthSchema extends AuthModel {}

export interface AuthEntities {
  auths: {[key: string]: AuthSchema};
}
