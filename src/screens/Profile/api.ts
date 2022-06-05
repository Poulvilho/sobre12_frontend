import { AxiosResponse } from 'axios';

import { IUser } from '../../contexts/user';

import sobre12Api from '../../services/api';
import { IRegister } from '../Register/api';

const UpdateProfile = (async (
  userId: string,
  user: IRegister,
): Promise<AxiosResponse<IUser>>  => {
  const response = await sobre12Api.put<IUser>(
    `/user/${userId}`,
    user,
  );
  return response;
});

export { UpdateProfile };
