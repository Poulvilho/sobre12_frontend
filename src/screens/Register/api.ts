import { IUser } from '../../context/user';
import sobre12Api from '../../services/api';
import { ILogin } from '../Login/api';

export interface IRegister extends ILogin {
  name: string;
}

const RegisterRequest = ((user: IRegister) => {
  sobre12Api.post<IUser>('/user/register', user);
});

export { RegisterRequest }
