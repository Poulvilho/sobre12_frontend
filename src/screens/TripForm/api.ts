import { AxiosResponse } from 'axios';
import sobre12Api from '../../services/api';

import { IContract } from '../../contexts/contract';

export interface ITripForm {
  name: string;
  description: string;
  dtstart: Date;
  dtend: Date;
  user: string;
}

const CreateTrip = ((trip: ITripForm): Promise<AxiosResponse<IContract>> => {
  const response = sobre12Api.post<IContract>('/trip/create', trip);
  return response;
});

export { CreateTrip };
