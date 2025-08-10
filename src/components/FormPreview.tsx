// src/components/FormPreview.tsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Button, Box, Typography, Paper, Alert } from '@mui/material';
import { FormSchema, Field } from '../types';
import FieldRenderer from './FieldRenderer';

const FormPreview = () => {
  const currentForm = useSelector((state: RootState) => state.form.currentForm) as FormSchema | null;
  const [formValues, setFormValues] = useState<{ [key: string]: string | number | boolean | undefined }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleChange = (fieldId: string, value: string | number | boolean | undefined) => {
    setFormValues((prev) => ({ ...prev, [fieldId]: value }));
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[fieldId];
      return newErrors;
    });
    setSubmitStatus(null);
  };

  const validateField = (field: Field, value: string | number | boolean | undefined): string | undefined => {
    if (field.required && !value && value !== 0 && value !== false) {
      return 'This field is required';
    }
    for (const rule of field.validations) {
      switch (rule.type) {
        case 'notEmpty':
          if (!value || (typeof value === 'string' && value.trim() === '')) {
            return rule.message;
          }
          break;
        case 'minLength':
          if (typeof value === 'string' && value.length < (rule.value as number)) {
            return rule.message;
          }
          break;
        case 'maxLength':
          if (typeof value === 'string' && value.length > (rule.value as number)) {
            return rule.message;
          }
          break;
        case 'email':
          if (typeof value === 'string' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return rule.message;
          }
          break;
        case 'customPassword':
          if (typeof value === 'string' && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value)) {
            return rule.message;
          }
          break;
      }
    }
    return undefined;
  };

  const handleSubmit = () => {
    if (!currentForm) return;
    const newErrors: { [key: string]: string } = {};
    currentForm.fields.forEach((field) => {
      if (!field.isDerived) {
        const error = validateField(field, formValues[field.id]);
        if (error) {
          newErrors[field.id] = error;
        }
      }
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setSubmitStatus('success');
      console.log('Form values:', formValues);
    } else {
      setSubmitStatus('error');
    }
  };

  if (!currentForm || currentForm.fields.length === 0) {
    return (
      <Box sx={{ maxWidth: 800, mx: 'auto', p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          No form selected or no fields added.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper sx={{ p: 3, bgcolor: 'background.paper' }}>
        <Typography variant="h4" gutterBottom>
          {currentForm.name || 'Form Preview'}
        </Typography>
        {currentForm.fields.map((field) => (
          <Box key={field.id} sx={{ mb: 2 }}>
            <FieldRenderer
              field={field}
              value={formValues[field.id]}
              onChange={(value) => handleChange(field.id, value)}
              error={errors[field.id]}
              formValues={formValues}
            />
          </Box>
        ))}
        {submitStatus === 'success' && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Form submitted successfully!
          </Alert>
        )}
        {submitStatus === 'error' && (
          <Alert severity="error" sx={{ mt: 2 }}>
            Please fix the errors before submitting.
          </Alert>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 2, width: '100%' }}
        >
          Submit Form
        </Button>
      </Paper>
    </Box>
  );
};

export default FormPreview;