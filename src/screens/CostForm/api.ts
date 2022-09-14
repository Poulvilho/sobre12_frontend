import { AxiosResponse } from 'axios';
import { IUser } from '../../contexts/user';
import sobre12Api from '../../services/api';

export interface ICostForm {
  description: string;
  value: number;
  category: string;
  dtcost: Date;
  trip: string;
  user: string;
  participants: Array<string>;
}

export interface ICost extends ICostForm {
  id: string;
  User: IUser;
}

const CreateCost = ((
  cost: ICostForm,
): Promise<AxiosResponse<ICost>> => {
  const response = sobre12Api.post<ICost>('/cost/create', cost);
  return response;
});

export { CreateCost };
