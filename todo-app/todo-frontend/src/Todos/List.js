import React from 'react';
import Todo from './Todo'; // Import the new Todo component

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  return (
      <>
        {todos.map((todo, index) => (
            <div key={index}>
              <Todo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />
              <hr />
            </div>
        ))}
      </>
  );
};

export default TodoList;