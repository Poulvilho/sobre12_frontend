import { AxiosResponse } from 'axios'
import sobre12Api from '../../services/api'

import { IBudget } from '../BudgetForm/api';

const GetBudgets = (async (
  tripId: string,
): Promise<AxiosResponse<Array<IBudget>>> => {
  const response = await sobre12Api.post<Array<IBudget>>(
    `/budget/index/${tripId}`,
  );
  return response;
});

export { GetBudgets }
