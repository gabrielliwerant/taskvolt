import { createSlice } from '@reduxjs/toolkit';

const initialState = { todos: { items: {}, sort: [] } };

const makeNewTodo = (id, final) => ({
  id,
  text: {
    draft: final,
    final
  },
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
    edit: (state, action) => {
      state.items[action.payload.id].isEditActive = true;
    },
    save: (state, action) => {
      state.items[action.payload.id].isEditActive = false;
      state.items[action.payload.id].text.final = action.payload.draft;
    },
    cancel: (state, action) => {
      const final = state.items[action.payload.id].text.final;
      state.items[action.payload.id].isEditActive = false;
      state.items[action.payload.id].text.draft = final;
    },
    remove: (state, action) => {
      state.sort = state.sort.filter(id => id !== action.payload.id);
    },
    complete: (state, action) => {
      state.items[action.payload.id].isComplete = action.payload.checked;
    },
    change: (state, action) => {
      state.items[action.payload.id].text.draft = action.payload.draft;
    },
    reorder: (state, action) => {
      const orderedId = state.sort[action.payload.oldIndex];
      state.sort.splice(action.payload.oldIndex, 1);
      state.sort.splice(action.payload.newIndex, 0, orderedId);
    }
  }
});

export { todosSlice };
