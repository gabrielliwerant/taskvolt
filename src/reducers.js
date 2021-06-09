import { createSlice } from '@reduxjs/toolkit';

const initialState = { todos: { items: {}, sort: [] } };

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
      state.items[id] = makeNewTodo(id, 'New todo');
      state.sort.push(id);
    },
    edit: (state, action) => { state.items[action.payload.id].isEditActive = true; },
    save: (state, action) => { state.items[action.payload.id].isEditActive = false; },
    remove: (state, action) => { delete state.items[action.payload.id]; },
    complete: (state, action) => {
      state.items[action.payload.id].isComplete = action.payload.checked;
    },
    change: (state, action) => {
      state.items[action.payload.id].text = action.payload.text;
    },
    reorder: (state, action) => {
      const orderedId = state.sort[action.payload.oldIndex];
      state.sort.splice(action.payload.oldIndex, 1);
      state.sort.splice(action.payload.newIndex, 0, orderedId);
    }
  }
});

export { todosSlice };
