import { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Header from "./components/Header";
import TodosList from "./components/TodosList";
import { TODOS } from "./constant";

function App() {
  const [input,setInput]=useState("")
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  useEffect(() => {
   getAllTodos()
  }, []);
  const getAllTodos=()=>{
    fetch(TODOS)
      .then((response) => response.json())
      .then((data) => setTodos(data.tasks))
      .catch((err) => console.error(err));
  }
  return (
    <div className="container">
      <div className="app-wrapper">
        <div>
          <Header />
        </div>
        <div>
          <Form
            input={input}
            setInput={setInput}
            todos={todos}
            setTodos={setTodos}
            editTodo={editTodo}
            setEditTodo={setEditTodo}
          />
        </div>
        <div>
          <TodosList
            todos={todos}
            setTodos={setTodos}
            setEditTodo={setEditTodo}
          />
        </div>
      </div>
    </div>
  );
} 

export default App;
