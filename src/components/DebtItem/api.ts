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
  const debtPaid = {
    cost: debt.cost,
    user: debt.user,
    value: debt.value,
    settled: true,
  }; 
  const response = await sobre12Api.put<IDebtForm>(
    `/debt/${debt.cost}/${debt.user}`, debtPaid,
  );
  return response;
});

export { EditDebt };
