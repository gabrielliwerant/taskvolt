import React, { useState } from 'react';

const makeNewTodo = (id, text) => ({
  id,
  text,
  isEditActive: false
});

const App = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    const newTodos = todos.map(todo => todo);
    const id = Math.floor(Math.random() * 1000000);

    newTodos.push(makeNewTodo(id, 'New todo'));

    setTodos(newTodos);
  };

  const editTodo = id => () => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) todo.isEditActive = true;
      return todo;
    });

    setTodos(newTodos);
  };

  const onChange = id => e => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) todo.text = e.target.value;
      return todo;
    });

    setTodos(newTodos);
  };

  const onSave = id => () => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) todo.isEditActive = false;
      return todo;
    });

    setTodos(newTodos);
  };

  return (
    <>
      <div>Todo List</div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} id={todo.id}>
            <span
              onClick={editTodo(todo.id)}
              style={{ display: todo.isEditActive ? 'none' : 'inline' }}
            >
              {todo.text}
              {console.log(todo)}
            </span>
            <div style={{ display: todo.isEditActive ? 'block' : 'none' }}>
              <input
                onChange={onChange(todo.id)}
                type='text'
                value={todo.text}
              />
              <button onClick={onSave(todo.id)}>Save</button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={addTodo}>Add Todo</button>
    </>
  )
};

export default App;
