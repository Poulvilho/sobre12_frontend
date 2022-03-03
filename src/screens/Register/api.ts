import sobre12Api from '../../services/api';
import { ILogin } from '../Login/api';

export interface IUser extends ILogin {
  name: string;
}

const RegisterRequest = ((user: IUser) => {
  sobre12Api.post<IUser>('/user/register', user);
});

export { RegisterRequest }
