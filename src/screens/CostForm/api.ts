import { AxiosResponse } from 'axios';
import sobre12Api from '../../services/api';

export interface ICostForm {
  description: string;
  value: number;
  category: string;
  dtcost: Date;
  trip: string;
  user: string;
}

export interface ICost extends ICostForm {
  id: string;
}

const CreateCost = ((
  cost: ICostForm,
): Promise<AxiosResponse<ICost>> => {
  const response = sobre12Api.post<ICost>('/cost/create', cost);
  return response;
});

export { CreateCost };
