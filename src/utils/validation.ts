import { Field } from '../types';

export const validateField = (field: Field, value: any): string => {
  for (const rule of field.validations) {
    if (rule.type === 'notEmpty' && !value) return rule.message;
    if (rule.type === 'minLength' && typeof value === 'string' && value.length < (rule.value as number)) return rule.message;
    if (rule.type === 'maxLength' && typeof value === 'string' && value.length > (rule.value as number)) return rule.message;
    if (rule.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return rule.message;
    if (rule.type === 'customPassword' && value && !/^(?=.*\d).{8,}$/.test(value)) return rule.message;
  }
  return '';
};