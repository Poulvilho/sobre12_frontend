import { AxiosResponse } from 'axios';
import sobre12Api from '../../services/api';

import { IContract } from '../../contexts/contract';

interface IGuestTrip {
  user: string;
  role: number;
}
interface ISpectatorTrip {
  spectated: string;
}

interface IContractResponse extends IContract {
  guests?: Array<IGuestTrip>;
  spectators?: Array<ISpectatorTrip>;
}

const GetTrips = ((
  userId: string,
): Promise<AxiosResponse<Array<IContractResponse>>>  => {
  const response = sobre12Api.post<Array<IContractResponse>>(
    `/trip/index/${userId}`,
  );
  return response;
});

export { GetTrips };
