import { AxiosResponse } from 'axios';
import { IUser } from '../../contexts/user';
import sobre12Api from '../../services/api';

export interface ILogin {
  email: string;
  password: string;
}

const LoginRequest = ((user: ILogin): Promise<AxiosResponse<IUser>> => {
  const response = sobre12Api.post<IUser>('/user/login', user);
  return response;
});

export { LoginRequest }
