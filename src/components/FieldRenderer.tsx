import React from 'react';
import { TextField, FormControlLabel, Checkbox, Select, MenuItem, FormControl, InputLabel, Radio, RadioGroup, FormLabel, Box, Typography } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { Field, FormSchema } from '../types';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface FieldRendererProps {
  field: Field;
  value: string | number | boolean | undefined;
  onChange: (value: string | number | boolean | undefined) => void;
  error?: string;
  formValues: { [key: string]: string | number | boolean | undefined };
}

const FieldRenderer: React.FC<FieldRendererProps> = ({ field, value, onChange, error, formValues }) => {
  const currentForm = useSelector((state: RootState) => state.form.currentForm) as FormSchema | null;

  const derivedValue = field.isDerived && field.parentFields && field.formula ? calculateDerivedValue(field, currentForm, formValues) : undefined;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>,
  ) => {
    let newValue: string | number | boolean | undefined;
    if (field.type === 'checkbox') {
      newValue = (e.target as HTMLInputElement).checked;
    } else if (field.type === 'number') {
      newValue = e.target.value ? Number(e.target.value) : '';
    } else if (field.type === 'select' || field.type === 'radio') {
      newValue = e.target.value as string;
    } else {
      newValue = e.target.value as string;
    }
    onChange(newValue);
  };

  switch (field.type) {
    case 'text':
    case 'textarea':
      return (
        <TextField
          label={field.label}
          type={field.type === 'text' ? 'text' : 'textarea'}
          multiline={field.type === 'textarea'}
          rows={field.type === 'textarea' ? 4 : undefined}
          value={field.isDerived ? derivedValue || '' : value || ''}
          onChange={handleChange}
          disabled={field.isDerived}
          fullWidth
          margin="normal"
          error={!!error}
          helperText={error}
          variant="outlined"
          sx={{ bgcolor: 'background.paper' }}
        />
      );
    case 'number':
      return (
        <TextField
          label={field.label}
          type="number"
          value={field.isDerived ? derivedValue || '' : value || ''}
          onChange={handleChange}
          disabled={field.isDerived}
          fullWidth
          margin="normal"
          error={!!error}
          helperText={error}
          variant="outlined"
          sx={{ bgcolor: 'background.paper' }}
        />
      );
    case 'select':
      return (
        <FormControl fullWidth margin="normal" error={!!error} sx={{ bgcolor: 'background.paper' }}>
          <InputLabel>{field.label}</InputLabel>
          <Select
            value={(value as string) || ''}
            onChange={handleChange}
            disabled={field.isDerived}
            sx={{ borderRadius: '8px' }}
          >
            {field.options?.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          {error && <Typography variant="caption" color="error" sx={{ mt: 1 }}>{error}</Typography>}
        </FormControl>
      );
    case 'radio':
      return (
        <FormControl component="fieldset" margin="normal" error={!!error} sx={{ bgcolor: 'background.paper', p: 2, borderRadius: '8px' }}>
          <FormLabel>{field.label}</FormLabel>
          <RadioGroup value={(value as string) || ''} onChange={handleChange}>
            {field.options?.map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio color="primary" />}
                label={option}
                disabled={field.isDerived}
              />
            ))}
          </RadioGroup>
          {error && <Typography variant="caption" color="error" sx={{ mt: 1 }}>{error}</Typography>}
        </FormControl>
      );
    case 'checkbox':
      return (
        <FormControlLabel
          control={
            <Checkbox
              checked={!!value}
              onChange={handleChange}
              disabled={field.isDerived}
              color="primary"
            />
          }
          label={field.label}
          sx={{ bgcolor: 'background.paper', p: 1, borderRadius: '8px' }}
        />
      );
    case 'date':
      return (
        <TextField
          label={field.label}
          type="date"
          value={field.isDerived ? derivedValue || '' : value || ''}
          onChange={handleChange}
          disabled={field.isDerived}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          error={!!error}
          helperText={error}
          variant="outlined"
          sx={{ bgcolor: 'background.paper' }}
        />
      );
    default:
      return null;
  }
};

const calculateDerivedValue = (
  field: Field,
  form: FormSchema | null,
  formValues: { [key: string]: string | number | boolean | undefined },
): string | number | undefined => {
  if (!field.isDerived || !field.parentFields || !field.formula || !form) return undefined;

  try {
    const parentValues = field.parentFields.map((parentId) => {
      return formValues[parentId] ?? form.fields.find((f) => f.id === parentId)?.defaultValue ?? '';
    });

    const formula = field.formula.toLowerCase();
    if (formula === 'sum') {
      return parentValues.reduce((acc: number, val) => acc + (Number(val) || 0), 0);
    } else if (formula === 'average') {
      const numbers = parentValues.map(Number).filter((n) => !isNaN(n));
      return numbers.length ? numbers.reduce((acc, val) => acc + val, 0) / numbers.length : undefined;
    } else {
      const fn = new Function('values', `return ${field.formula}`);
      return fn(parentValues);
    }
  } catch (error) {
    console.error('Error evaluating derived field formula:', error);
    return undefined;
  }
};

export default FieldRenderer;