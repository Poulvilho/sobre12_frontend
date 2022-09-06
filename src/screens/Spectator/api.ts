import { AxiosResponse } from 'axios';
import sobre12Api from '../../services/api';

export interface ISpectatorForm {
  email: string;
  trip: string;
  spectated: string;
}

export interface ISpectatorUser {
  id: string;
  name: string;
  email: string;
}

interface IDeleteResponse {
  data: number;
  message: string;
}

export interface ISpectator {
  spectator: ISpectatorUser
}

const GetSpectators = ((
  trip: string,
  spectated: string,
): Promise<AxiosResponse<Array<ISpectator>>> => {
  const response = sobre12Api.post<Array<ISpectator>>(
    '/spectator/index/', { trip, spectated },
  );
  return response;
});

const CreateSpectator = ((
  spectator: ISpectatorForm,
): Promise<AxiosResponse<ISpectator>> => {
  const response = sobre12Api.post<ISpectator>(
    '/spectator/create', spectator,
  );
  return response;
});

const DeleteSpectator = ((
  trip: string,
  spectated: string,
  spectator: string,
): Promise<AxiosResponse<IDeleteResponse>> => {
  const response = sobre12Api.delete<IDeleteResponse>(
    `/spectator/${trip}/${spectated}/${spectator}`,
  );
  return response;
});

export { GetSpectators, CreateSpectator, DeleteSpectator };
