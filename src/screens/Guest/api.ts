import { AxiosResponse } from 'axios';
import sobre12Api from '../../services/api';

export interface IGuestForm {
  trip: string;
  email: string;
}

export interface IGuestUser {
  id: string;
  name: string;
  email: string;
}

export interface IGuest {
  User: IGuestUser
  role: number;
}

const GetGuests = ((
  trip: string,
): Promise<AxiosResponse<Array<IGuest>>> => {
  const response = sobre12Api.get<Array<IGuest>>(
    `/guest/index/${trip}`,
  );
  return response;
});

const CreateGuest = ((
  guest: IGuestForm,
): Promise<AxiosResponse<IGuest>> => {
  const response = sobre12Api.post<IGuest>(
    '/guest/create', guest,
  );
  return response;
});

const DeleteGuest = ((
  tripId: string,
  guestId: string,
): Promise<AxiosResponse<IGuest>> => {
  const response = sobre12Api.delete<IGuest>(`/guest/${tripId}/${guestId}`);
  return response;
});

export { GetGuests, CreateGuest, DeleteGuest };
