import sobre12Api from '../../services/api';

export interface ITripForm {
  name: string;
  description: string;
  dtstart: Date;
  dtend: Date;
  user: string;
}

export interface ITrip extends ITripForm {
  id: string;
}

const CreateTrip = ((trip: ITripForm) => {
  sobre12Api.post<ITrip>('/trip/create', trip);
});

export { CreateTrip };
