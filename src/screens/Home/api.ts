import { AxiosResponse } from 'axios';
import sobre12Api from '../../services/api';

import { IContract } from '../../contexts/contract';

const GetTrips = ((
  userId: string,
): Promise<AxiosResponse<Array<IContract>>>  => {
  const response = sobre12Api.post<Array<IContract>>(
    `/trip/index/${userId}`,
  );
  return response;
});

export { GetTrips };
