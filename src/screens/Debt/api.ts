import { AxiosResponse } from 'axios'
import { IUser } from '../../contexts/user';
import sobre12Api from '../../services/api'
import { ICost } from '../CostForm/api';

export interface IDebt {
  cost: string;
  value: number;
  settled: boolean;
  user: string;
  User: IUser;
  Cost: ICost;
}

const GetMyDebts = (async (
  userId: string,
  tripId: string,
): Promise<AxiosResponse<Array<IDebt>>> => {
  const response = await sobre12Api.post<Array<IDebt>>(
    `/debt/myDebts/${tripId}/${userId}`,
  );
  return response;
});

const GetMyCredits = (async (
  userId: string,
  tripId: string,
): Promise<AxiosResponse<Array<IDebt>>> => {
  const response = await sobre12Api.post<Array<IDebt>>(
    `/debt/myCredits/${tripId}/${userId}`,
  );
  return response;
});

export { GetMyDebts, GetMyCredits }
