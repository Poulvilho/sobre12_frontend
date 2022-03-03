import { AxiosResponse } from 'axios';
import { authResult } from '../../hooks/auth';
import sobre12Api from '../../services/api';
import { ITrip } from '../TripForm/api';

const GetTrips = (async (): Promise<AxiosResponse<Array<ITrip>>>  => {
  const response = await sobre12Api.post<Array<ITrip>>(
    `/trip/index/${authResult.id}`,
  );
  return response;
});

export { GetTrips };
