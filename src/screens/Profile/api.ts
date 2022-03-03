import { AxiosResponse } from 'axios';

import { authResult } from '../../hooks/auth';

import sobre12Api from '../../services/api';
import { ILoginResponse } from '../Login/api';
import { IUser } from '../Register/api';

const UpdateProfile = (async (
  user: IUser,
): Promise<AxiosResponse<ILoginResponse>>  => {
  const response = await sobre12Api.put<ILoginResponse>(
    `/user/${authResult.id}`,
    user,
  );
  return response;
});
  
export { UpdateProfile };
