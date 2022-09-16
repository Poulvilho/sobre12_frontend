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

const UpdateCost = ((
  costId: string,
  cost: ICostForm,
): Promise<AxiosResponse<ICost>> => {
  const response = sobre12Api.put<ICost>(`/cost/${costId}`, cost);
  return response;
});

const DeleteCost = ((costId: string): Promise<AxiosResponse<ICost>> => {
  const response = sobre12Api.delete<ICost>(`/cost/${costId}`);
  return response;
});

export { CreateCost, UpdateCost, DeleteCost };
