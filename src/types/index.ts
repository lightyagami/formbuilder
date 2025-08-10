export interface ValidationRule {
  type: 'notEmpty' | 'minLength' | 'maxLength' | 'email' | 'customPassword';
  value?: number | string;
  message: string;
}

export interface Field {
  id: string;
  type: 'text' | 'number' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'date';
  label: string;
  required: boolean;
  defaultValue?: string | number | boolean;
  validations: ValidationRule[];
  options?: string[];
  isDerived?: boolean;
  parentFields?: string[];
  formula?: string;
}

export interface FormSchema {
  id: string;
  name: string;
  createdAt: string;
  fields: Field[];
}

export interface FormState {
  currentForm: FormSchema | null;
  forms: FormSchema[];
}

export interface FieldConfig {
  label: string;
  type: string;
  validation?: string;
}