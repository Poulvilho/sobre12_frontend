import { AxiosResponse } from 'axios';
import sobre12Api from '../../services/api';
import { ITrip } from '../TripForm/api';

const GetTrips = ((userId: string): Promise<AxiosResponse<Array<ITrip>>>  => {
  const response = sobre12Api.post<Array<ITrip>>(
    `/trip/index/${userId}`,
  );
  return response;
});

export { GetTrips };
