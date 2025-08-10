import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateField } from '../store/slices/formSlice';
import { TextField, FormControlLabel, Checkbox, Select, MenuItem, FormControl, InputLabel, Chip, Box, Button } from '@mui/material';
import { Field, ValidationRule } from '../types';
import DerivedFieldConfig from './DerivedFieldConfig';

interface FieldConfigProps {
  field: Field;
}

const FieldConfig: React.FC<FieldConfigProps> = ({ field }) => {
  const dispatch = useDispatch();
  const [validationType, setValidationType] = useState<string>('');
  const [validationValue, setValidationValue] = useState<string | number>('');
  const [validationMessage, setValidationMessage] = useState<string>('');

  const handleChange = (updates: Partial<Field>) => {
    dispatch(updateField({ ...field, ...updates }));
  };

  const addValidation = () => {
    if (validationType && validationMessage) {
      const newValidation: ValidationRule = {
        type: validationType as ValidationRule['type'],
        value: validationValue || undefined,
        message: validationMessage,
      };
      handleChange({ validations: [...field.validations, newValidation] });
      setValidationType('');
      setValidationValue('');
      setValidationMessage('');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2, bgcolor: 'background.paper', borderRadius: '8px', flex: 1 }}>
      <TextField
        label="Label"
        value={field.label}
        onChange={(e) => handleChange({ label: e.target.value })}
        size="small"
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <FormControlLabel
        control={<Checkbox checked={field.required} onChange={(e) => handleChange({ required: e.target.checked })} color="primary" />}
        label="Required"
      />
      <FormControl size="small" fullWidth margin="normal">
        <InputLabel>Field Type</InputLabel>
        <Select
          value={field.type}
          onChange={(e) => handleChange({ type: e.target.value as Field['type'] })}
          sx={{ borderRadius: '8px' }}
        >
          <MenuItem value="text">Text</MenuItem>
          <MenuItem value="number">Number</MenuItem>
          <MenuItem value="textarea">Textarea</MenuItem>
          <MenuItem value="select">Select</MenuItem>
          <MenuItem value="radio">Radio</MenuItem>
          <MenuItem value="checkbox">Checkbox</MenuItem>
          <MenuItem value="date">Date</MenuItem>
        </Select>
      </FormControl>
      {(field.type === 'select' || field.type === 'radio') && (
        <TextField
          label="Options (comma-separated)"
          value={field.options?.join(',') || ''}
          onChange={(e) => handleChange({ options: e.target.value.split(',').map((opt) => opt.trim()) })}
          size="small"
          fullWidth
          margin="normal"
          variant="outlined"
        />
      )}
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Validation</InputLabel>
          <Select
            value={validationType}
            onChange={(e) => setValidationType(e.target.value)}
            sx={{ borderRadius: '8px' }}
          >
            <MenuItem value="notEmpty">Not Empty</MenuItem>
            <MenuItem value="minLength">Min Length</MenuItem>
            <MenuItem value="maxLength">Max Length</MenuItem>
            <MenuItem value="email">Email</MenuItem>
            <MenuItem value="customPassword">Password</MenuItem>
          </Select>
        </FormControl>
        {(validationType === 'minLength' || validationType === 'maxLength') && (
          <TextField
            label="Value"
            type="number"
            value={validationValue}
            onChange={(e) => setValidationValue(Number(e.target.value))}
            size="small"
            margin="normal"
            variant="outlined"
            sx={{ maxWidth: 100 }}
          />
        )}
        <TextField
          label="Error Message"
          value={validationMessage}
          onChange={(e) => setValidationMessage(e.target.value)}
          size="small"
          margin="normal"
          variant="outlined"
          sx={{ flex: 1 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={addValidation}
          disabled={!validationType || !validationMessage}
        >
          Add
        </Button>
      </Box>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {field.validations.map((val, index) => (
          <Chip
            key={index}
            label={`${val.type}: ${val.message}`}
            onDelete={() =>
              handleChange({
                validations: field.validations.filter((_, i) => i !== index),
              })
            }
            color="primary"
            variant="outlined"
            sx={{ borderRadius: '8px' }}
          />
        ))}
      </Box>
      <FormControlLabel
        control={
          <Checkbox
            checked={field.isDerived}
            onChange={(e) => handleChange({ isDerived: e.target.checked })}
            color="primary"
          />
        }
        label="Derived Field"
      />
      {field.isDerived && <DerivedFieldConfig field={field} />}
    </Box>
  );
};

export default FieldConfig;