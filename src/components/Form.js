import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { TODO, TODOS } from "../constant";
const Form = ({ input, setInput, todos, setTodos, editTodo, setEditTodo }) => {
  const updateTodo = (name, id, completed) => {
    const editTodo = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, completed }),
    };
    // setTodos([...todos, { name: input, completed: false }]);
    fetch(TODO + id, editTodo)
      .then((response) => response.json())
      .then((data) => {
        setTodos(
          todos.map((todo) =>
            todo._id === id ? { name, id, completed } : todo
          )
        )
      });
    // setTodos(newTodo);
    setEditTodo("");
  };
  //   for edit todo list
  useEffect(() => {
    if (editTodo) {
      setInput(editTodo.name);
    } else {
      setInput("");
    }
  }, [setInput, editTodo]);
  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!editTodo) {
      // create data to the mongodb
      const createTodo = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: input, completed: false }),
      };
      // setTodos([...todos, { name: input, completed: false }]);
      fetch(TODOS, createTodo)
        .then((response) => response.json())
        .then((data) => {
          setTodos([...todos, data.task]);
          console.log(data);
        });

      setInput("");
    } else {
      updateTodo(input, editTodo._id, editTodo.completed);
    }
  };
  return (
    <form onSubmit={onFormSubmit}>
      <input
        className="task-input"
        type="text"
        placeholder="Enter a Todo..."
        value={input}
        required
        onChange={onInputChange}
      />
      <button className="button-add" type="submit">
        Add
      </button>
    </form>
  );
};

export default Form;
