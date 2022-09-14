import { AxiosResponse } from 'axios';
import sobre12Api from '../../services/api';
import { ISubcategory } from '../Subcategory/api';

export interface ISubcategoryForm {
  description: string;
  category: string;
  trip: string;
}

const CreateSubcategory = ((
  subcategory: ISubcategoryForm,
): Promise<AxiosResponse<ISubcategory>> => {
  const response = sobre12Api.post<ISubcategory>(
    '/subcategory/create', subcategory,
  );
  return response;
});

const EditSubcategory = ((
  subcategoryId: string,
  subcategory: ISubcategoryForm,
): Promise<AxiosResponse<ISubcategory>> => {
  const response = sobre12Api.put<ISubcategory>(
    `/subcategory/${subcategoryId}`, subcategory,
  );
  return response;
});

const DeleteSubcategory = ((
  subcategoryId: string,
): Promise<AxiosResponse<ISubcategory>> => {
  const response = sobre12Api.delete<ISubcategory>(
    `/subcategory/${subcategoryId}`,
  );
  return response;
});

export { CreateSubcategory, EditSubcategory, DeleteSubcategory };
