import { AxiosResponse } from 'axios';
import sobre12Api from '../../services/api';

import { IContract } from '../../contexts/contract';

export interface ITripForm {
  id: string;
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

const EditTrip = ((trip: ITripForm): Promise<AxiosResponse<IContract>> => {
  const response = sobre12Api.put<IContract>(`/trip/${trip.id}`, trip);
  return response;
});

const DeleteTrip = ((tripId: string): Promise<AxiosResponse<IContract>> => {
  const response = sobre12Api.delete<IContract>(`/trip/${tripId}`);
  return response;
});

export { CreateTrip, EditTrip, DeleteTrip };
