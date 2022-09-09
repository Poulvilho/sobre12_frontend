import { AxiosResponse } from 'axios';

import { IUser } from '../../contexts/user';

import sobre12Api from '../../services/api';
import { IRegister } from '../Register/api';

export interface IEditUser extends IRegister {
  id: string;
  oldPassword: string;
}

const UpdateProfile = (async (
  user: IEditUser,
): Promise<AxiosResponse<IUser>>  => {
  const response = await sobre12Api.put<IUser>(
    `/user/${user.id}`,
    user,
  );
  return response;
});

export { UpdateProfile };
