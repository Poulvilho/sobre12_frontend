import { AxiosResponse } from 'axios';
import sobre12Api from '../../services/api';

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse extends ILogin {
  id: string;
  name: string;
}

const LoginRequest = ((user: ILogin): Promise<AxiosResponse<any>> => {
  const response = sobre12Api.post<ILoginResponse>('/user/login', user);
  return response;
});

export { LoginRequest }
