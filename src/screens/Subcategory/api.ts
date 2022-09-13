import { AxiosResponse } from 'axios';
import sobre12Api from '../../services/api';
import { ISubcategoryForm } from '../SubcategoryForm/api';

export interface ISubcategory extends ISubcategoryForm {
  id: string;
}

const GetSubcategory = ((
  trip: string,
): Promise<AxiosResponse<Array<ISubcategory>>> => {
  const response = sobre12Api.post<Array<ISubcategory>>(
    `/subcategory/index/${trip}`,
  );
  return response;
});

export { GetSubcategory };
