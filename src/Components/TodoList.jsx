import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaCheck,
  FaTrash,
  FaEdit,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import "../styles.css";
import ReactPaginate from "react-paginate";


function TodoList({ user }) {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editTodo, setEditTodo] = useState({});
  const [newTaskName, setNewTaskName] = useState("");
  const itemsPerPage = 40;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = todos.slice(indexOfFirstItem, indexOfLastItem);

  const handleEditClick = (todo) => {
    setEditTodo({
      ...todo,
    });
  };

  const handleEditInputChange = (event) => {
    setEditTodo({
      ...editTodo,
      name: event.target.value,
    });
  };
  // handle submission of form
  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/tasks/${editTodo.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editTodo),
        }
      );
      const data = await response.json();
      setTodos((prevState) =>
        prevState.map((todo) => (todo.id === data.id ? data : todo))
      );
      setEditTodo({});
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchTodos() {
      const response = await axios.get("http://127.0.0.1:3000/tasks");
      setTodos(response.data);
    }
    fetchTodos();
  }, []);

  const handleComplete = async (id) => {
    try {
      const response = await axios.patch(`http://127.0.0.1:3000/tasks/${id}`, {
        completed: true,
        user_id: user.id
      });
      
      setTodos(prevTodos => {
        const index = prevTodos.findIndex(todo => todo.id === id);
        const updatedTodo = { ...prevTodos[index], completed: true };
        const updatedTodos = [...prevTodos];
        updatedTodos[index] = updatedTodo;
        return updatedTodos;
      });
      
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleDelete = async (id) => {
    await axios.delete(`http://127.0.0.1:3000/tasks/${id}`);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const pageCount = Math.ceil(todos.length / itemsPerPage);

  function handlePageClick({ selected }) {
    setCurrentPage(selected + 1);
  }

  const handleNewTaskSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:3000/tasks", {
        name: newTaskName,
        completed: false,
        user_id: user.id,
      });
      setTodos([...todos, response.data]);
      setNewTaskName("");
      alert("New task has been submitted.");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h2 className="heading">Todos</h2>

      <form className="new-task-form" onSubmit={handleNewTaskSubmit}>
        <input
        className="new-task-input"
          type="text"
          placeholder="Add a new todo"
          value={newTaskName}
          onChange={(event) => setNewTaskName(event.target.value)}
        />
        <button className="submit-task-button" type="submit">Add</button>
      </form>

      <div className="list-todos">
        <div className="todos-row">
          {currentItems.map((todo) => (
            <div
              key={todo.id}
              className={`todo-card ${
                todo.completed
                  ? "todo-card--completed"
                  : "todo-card--incomplete"
              }`}
            >
              <div className="todo-name">
                {editTodo.id === todo.id ? (
                  <form onSubmit={handleEditSubmit}>
                    <input
                      type="text"
                      name="name"
                      value={editTodo.name}
                      onChange={handleEditInputChange}
                    />
                    <button type="submit">Save</button>
                  </form>
                ) : (
                  todo.name
                )}
              </div>
              <div className="completed">
                {todo.completed ? "Completed" : "Not Completed"}
              </div>
              <div className="clicked-todo">
                <button
                  className="click"
                  onClick={() => handleComplete(todo.id)}
                >
                  <FaCheck />
                </button>
                <button
                  className="button-click"
                  onClick={() => handleDelete(todo.id)}
                >
                  <FaTrash />
                </button>
                <button
                  className="button1-click"
                  onClick={() => handleEditClick(todo)}
                >
                  <FaEdit />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pagination">
        <ReactPaginate
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName="pagination-container"
          pageClassName="pagination-item"
          activeClassName="pagination-item--active"
          previousClassName="pagination-previous"
          nextClassName="pagination-next"
          disabledClassName="pagination-item--disabled"
        />
      </div>
    </div>
  );
}

export default TodoList;
