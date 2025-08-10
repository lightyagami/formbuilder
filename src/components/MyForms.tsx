import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { loadForm, deleteForm } from '../store/slices/formSlice';
import { FormSchema } from '../types';
import { Box, Typography, Button, Card, CardContent, CardActions } from '@mui/material';
import { GridLegacy as Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const MyForms = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const forms = useSelector((state: RootState) => state.form.forms) as FormSchema[];

  const handleLoadForm = (formId: string) => {
    dispatch(loadForm(formId));
    navigate('/preview');
  };

  const handleDeleteForm = (formId: string) => {
    if (window.confirm('Are you sure you want to delete this form?')) {
      dispatch(deleteForm(formId));
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">My Forms</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate('/create')}
        >
          Create New Form
        </Button>
      </Box>

      {forms.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8, bgcolor: 'background.paper', borderRadius: 2 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No forms created yet
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Get started by creating your first form!
          </Typography>
          <Button variant="outlined" onClick={() => navigate('/create')}>
            Create Form
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {forms.map((form) => (
            <Grid item xs={12} sm={6} md={4} key={form.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {form.name || 'Untitled Form'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Created: {new Date(form.createdAt).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Fields: {form.fields.length}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between' }}>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => handleLoadForm(form.id)}
                  >
                    Preview
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteForm(form.id)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default MyForms;