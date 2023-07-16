import React from "react";
import { TODO } from "../constant";

const TodosList = ({ todos, setTodos, setEditTodo }) => {
  const handleDelete = (id) => {
    // setTodos(todos.filter((todo)=> todo._id !== id))
    fetch(TODO + id, {
      method: "DELETE",
    }).then(() => setTodos(todos.filter((todo) => todo._id !== id)));
  };
  const handleComplete = (id) => {
      fetch(TODO + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: true }),
      }).then(() =>  setTodos(
      todos.map((item) => {
        if (item._id === id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    ));
  };
  const handleEdit = (id) => {
    const findTodo = todos.find((todo) => todo._id === id);
    setEditTodo(findTodo);

  };

  return (
    <div style={{ height: "500px", overflow: "scroll" }}>
      {todos.map((todo) => (
        <li className="list-item" key={todo._id}>
          <input
            type="text"
            className="list"
            value={todo?.name}
            onChange={(e) => e.preventDefault()}
          />
          <button
            className="button-completed task-button"
            onClick={() => handleComplete(todo._id)}>
            <i className="fa fa-check-circle"></i>
          </button>
          <button
            className="button-edit task-button"
            onClick={() => handleEdit(todo._id)}>
            <i className="fa fa-edit"></i>
          </button>
          <button
            className="button-delete task-button"
            onClick={() => handleDelete(todo._id)}>
            <i className="fa fa-trash"></i>
          </button>
        </li>
      ))}
    </div>
  );
};

export default TodosList;
