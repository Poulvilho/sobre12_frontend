import { AxiosResponse } from 'axios';
import sobre12Api from '../../services/api';

export interface IBudgetForm {
  description: string;
  value: number;
  dtbudget: Date;
  trip: string;
}

export interface IBudget extends IBudgetForm {
  id: string;
}

const CreateBudget = ((
  budget: IBudgetForm,
): Promise<AxiosResponse<IBudget>> => {
  const response = sobre12Api.post<IBudget>('/budget/create', budget);
  return response;
});

export { CreateBudget };
