import { AxiosResponse } from 'axios';
import sobre12Api from '../../services/api';

export interface IBudgetForm {
  description: string;
  value: number;
  category: string;
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

const UpdateBudget = ((
  budgetId: string,
  budget: IBudgetForm,
): Promise<AxiosResponse<IBudget>> => {
  const response = sobre12Api.put<IBudget>(`/budget/${budgetId}`, budget);
  return response;
});

const DeleteBudget = ((budgetId: string): Promise<AxiosResponse<IBudget>> => {
  const response = sobre12Api.delete<IBudget>(`/budget/${budgetId}`);
  return response;
})

export { CreateBudget, UpdateBudget, DeleteBudget };
