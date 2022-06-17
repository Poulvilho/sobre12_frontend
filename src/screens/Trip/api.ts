import { AxiosResponse } from 'axios'
import sobre12Api from '../../services/api'

import { ICost } from '../CostForm/api';

const GetCosts = (async (
  tripId: string,
  userId: string,
): Promise<AxiosResponse<Array<ICost>>> => {
  const response = await sobre12Api.post<Array<ICost>>(
    `/cost/index/${tripId}/${userId}`,
  );
  return response;
});

export { GetCosts }
