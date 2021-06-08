import { createSlice } from '@reduxjs/toolkit';

const initialState = { todos: {} };

const makeNewTodo = (id, text) => ({
  id,
  text,
  isEditActive: false,
  isComplete: false
});

const todosSlice = createSlice({
  name: 'todos',
  initialState: initialState.todos,
  reducers: {
    add: state => {
      const id = Math.floor(Math.random() * 1000000);
      state[id] = makeNewTodo(id, 'New todo');
    },
    edit: (state, action) => { state[action.payload.id].isEditActive = true; },
    save: (state, action) => { state[action.payload.id].isEditActive = false; },
    remove: (state, action) => { delete state[action.payload.id]; },
    complete: (state, action) => {
      state[action.payload.id].isComplete = action.payload.checked;
    },
    change: (state, action) => {
      state[action.payload.id].text = action.payload.text;
    }
  }
});

export { todosSlice };
