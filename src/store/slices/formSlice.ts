import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormSchema, Field } from '../../types';
import { v4 as uuidv4 } from 'uuid';

interface FormState {
  currentForm: FormSchema | null;
  forms: FormSchema[];
}

const initialState: FormState = {
  currentForm: null,
  forms: JSON.parse(localStorage.getItem('forms') || '[]'),
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addField: (state, action: PayloadAction<Field>) => {
      if (state.currentForm) {
        state.currentForm.fields.push(action.payload);
      } else {
        state.currentForm = {
          id: uuidv4(),
          name: '',
          createdAt: new Date().toISOString(),
          fields: [action.payload],
        };
      }
    },
    updateField: (state, action: PayloadAction<Field>) => {
      if (state.currentForm) {
        const index = state.currentForm.fields.findIndex((f) => f.id === action.payload.id);
        if (index !== -1) {
          state.currentForm.fields[index] = action.payload;
        }
      }
    },
    updateForm: (state, action: PayloadAction<FormSchema>) => {
      if (state.currentForm) {
        state.currentForm = action.payload;
      }
    },
    deleteField: (state, action: PayloadAction<string>) => {
      if (state.currentForm) {
        state.currentForm.fields = state.currentForm.fields.filter((f) => f.id !== action.payload);
      }
    },
    saveForm: (state, action: PayloadAction<string>) => {
      if (state.currentForm) {
        state.currentForm.name = action.payload;
        state.forms = [...state.forms.filter((f) => f.id !== state.currentForm!.id), state.currentForm];
        localStorage.setItem('forms', JSON.stringify(state.forms));
        state.currentForm = null;
      }
    },
    loadForm: (state, action: PayloadAction<string>) => {
      state.currentForm = state.forms.find((f) => f.id === action.payload) || null;
    },
  },
});

export const { addField, updateField, updateForm, deleteField, saveForm, loadForm } = formSlice.actions;
export default formSlice.reducer;