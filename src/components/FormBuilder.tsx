import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addField, updateForm, deleteField, saveForm } from '../store/slices/formSlice';
import { Button, IconButton, Typography, Box, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Field, FormSchema } from '../types';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import FieldConfig from './FieldConfig';
import AddIcon from '@mui/icons-material/Add';

const FormBuilder = () => {
  const dispatch = useDispatch();
  const currentForm = useSelector((state: RootState) => state.form.currentForm) as FormSchema | null;
  const fields = currentForm?.fields || [];

  const addNewField = () => {
    const newField: Field = {
      id: uuidv4(),
      type: 'text',
      label: 'New Field',
      required: false,
      validations: [],
      options: [],
      isDerived: false,
      parentFields: [],
      formula: '',
    };
    dispatch(addField(newField));
  };

  const handleSave = () => {
    const formName = prompt('Enter form name:');
    if (formName) {
      dispatch(saveForm(formName));
      window.location.href = '/myforms';
    }
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination || !currentForm) return;
    const reorderedFields = Array.from(currentForm.fields);
    const [movedField] = reorderedFields.splice(result.source.index, 1);
    reorderedFields.splice(result.destination.index, 0, movedField);
    dispatch(updateForm({ ...currentForm, fields: reorderedFields }));
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Paper sx={{ p: 2, mb: 3, position: 'sticky', top: 0, zIndex: 1, bgcolor: 'background.paper' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4">Create Form</Typography>
          <Box>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={addNewField}
              sx={{ mr: 1 }}
            >
              Add Field
            </Button>
            <Button variant="contained" color="secondary" onClick={handleSave}>
              Save Form
            </Button>
          </Box>
        </Box>
      </Paper>
      {fields.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8, bgcolor: 'background.paper', borderRadius: 2 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No fields added yet
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Start by adding a field to your form
          </Typography>
          <Button variant="outlined" onClick={addNewField}>
            Add Field
          </Button>
        </Box>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="fields">
            {(provided) => (
              <Box {...provided.droppableProps} ref={provided.innerRef} sx={{ minHeight: '100px' }}>
                {fields.map((field: Field, index: number) => (
                  <Draggable key={field.id} draggableId={field.id} index={index}>
                    {(provided) => (
                      <Paper
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={{ p: 2, mb: 2, display: 'flex', alignItems: 'center', bgcolor: 'background.paper' }}
                      >
                        <FieldConfig field={field} />
                        <IconButton
                          color="error"
                          onClick={() => dispatch(deleteField(field.id))}
                          sx={{ ml: 2 }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Paper>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </Box>
  );
};

export default FormBuilder;