import { FormSchema } from '../types'; // Adjust the path as needed

export const saveForms = (forms: FormSchema[]) => {
  localStorage.setItem('forms', JSON.stringify(forms));
};

export const loadForms = (): FormSchema[] => {
  return JSON.parse(localStorage.getItem('forms') || '[]');
};