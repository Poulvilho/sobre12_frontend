import { AxiosResponse } from 'axios';

import { IUser } from '../../contexts/user';

import sobre12Api from '../../services/api';
import { IRegister } from '../Register/api';

export interface IEditUser extends IRegister {
  oldPassword: string;
}

const UpdateProfile = (async (
  userId: string,
  user: IEditUser,
): Promise<AxiosResponse<IUser>>  => {
  const response = await sobre12Api.put<IUser>(
    `/user/${userId}`,
    user,
  );
  return response;
});

export { UpdateProfile };
