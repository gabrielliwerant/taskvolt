import React, { useState } from 'react';

const App = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    const newTodos = todos.map(todo => todo);

    newTodos.push('New todo');

    setTodos(newTodos);
  };

  return (
    <>
      <div>Todo List</div>
      <ul>
        {todos.map((todo, i) => <li key={i} id={i}>{todo}</li>)}
      </ul>
      <button onClick={addTodo}>Add Todo</button>
    </>
  )
};

export default App;
