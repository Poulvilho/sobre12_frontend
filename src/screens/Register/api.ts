import { AxiosResponse } from 'axios';
import { IUser } from '../../contexts/user';
import sobre12Api from '../../services/api';
import { ILogin } from '../Login/api';

export interface IRegister extends ILogin {
  name: string;
  passwordConfirm: string;
}

const RegisterRequest = ((user: IRegister): Promise<AxiosResponse<IUser>> => {
  const response = sobre12Api.post<IUser>('/user/register', user);
  return response;
});

export { RegisterRequest }
