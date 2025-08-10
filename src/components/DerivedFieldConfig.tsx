import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { updateField } from '../store/slices/formSlice';
import { FormControl, InputLabel, Select, MenuItem, TextField, Box } from '@mui/material';
import { Field, FormSchema } from '../types';

interface DerivedFieldConfigProps {
  field: Field;
}

const DerivedFieldConfig: React.FC<DerivedFieldConfigProps> = ({ field }) => {
  const dispatch = useDispatch();
  const currentForm = useSelector((state: RootState) => state.form.currentForm) as FormSchema | null;

  const handleChange = (updates: Partial<Field>) => {
    dispatch(updateField({ ...field, ...updates }));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2, bgcolor: 'background.paper', p: 2, borderRadius: '8px' }}>
      <FormControl size="small" fullWidth>
        <InputLabel>Parent Fields</InputLabel>
        <Select
          multiple
          value={field.parentFields || []}
          onChange={(e) => handleChange({ parentFields: e.target.value as string[] })}
          sx={{ borderRadius: '8px' }}
        >
          {currentForm?.fields
            .filter((f) => f.id !== field.id && !f.isDerived)
            .map((f) => (
              <MenuItem key={f.id} value={f.id}>
                {f.label}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <TextField
        label="Formula (JS expression)"
        value={field.formula || ''}
        onChange={(e) => handleChange({ formula: e.target.value })}
        size="small"
        fullWidth
        variant="outlined"
        helperText="e.g., sum, average, or values[0] + values[1]"
      />
    </Box>
  );
};

export default DerivedFieldConfig;