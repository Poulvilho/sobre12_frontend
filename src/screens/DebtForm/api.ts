import { AxiosResponse } from 'axios'
import sobre12Api from '../../services/api';

export interface IDebtForm {
  cost: string;
  user: string;
  value: number;
  settled: boolean;
}

const EditDebt = (async (
  debt: IDebtForm,
): Promise<AxiosResponse<IDebtForm>> => {
  const response = await sobre12Api.put<IDebtForm>(
    `/debt/${debt.cost}/${debt.user}`, debt,
  );
  return response;
});

export { EditDebt };
