import { AxiosResponse } from 'axios';
import sobre12Api from '../../services/api';

export interface ISubcategoryForm {
  description: string;
  category: number;
  trip: string;
}

export interface ISubcategory extends ISubcategoryForm {
  id: string;
}

const GetSubcategory = ((
  trip: string,
): Promise<AxiosResponse<Array<ISubcategory>>> => {
  const response = sobre12Api.get<Array<ISubcategory>>(
    `/subcategory/index/${trip}`,
  );
  return response;
});

const CreateSubcategory = ((
  subcategory: ISubcategoryForm,
): Promise<AxiosResponse<ISubcategory>> => {
  const response = sobre12Api.post<ISubcategory>(
    '/subcategory/create', subcategory,
  );
  return response;
});

export { GetSubcategory, CreateSubcategory };
