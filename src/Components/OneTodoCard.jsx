

import React, { useEffect, useState } from "react";
// import { useRef } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";

import "../styles.css"


const OneTodoCard = () => ({ todo, todos, setTodos, id}) => {
  const [edit, setEdit] = useState(false);
  const [editTodo, setEditTodo] = useState(todo.name);

//   const inputRef = useRef();
//   useEffect(() => {
//     inputRef.current?.focus();
//   }, [edit]);

  const handleEdit = (e) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  // const handleDelete = (id: number) => {
  //   setTodos(todos.filter((todo:Todo) => todo.id !== id));
  // };

  // function handleDeleteTask(todoToDelete: any){
  //   const updatedTasks = todos.filter((todo) => {
  //     if (todo.id !== todoToDelete.id) {
  //       return todo
  //     } else {
  //       return null
  //     }
  //   });
  //   setTodos(updatedTasks);
  // }

  const removeTodo = () => {
    setTodos(todos.filter(todo => todo.id !=id));
  }

  //const pageCount = Math.ceil(todos.length / tasksPerPage)
  // function handleDelete(){
  //   fetch(`http://127.0.0.1:3000/tasks/${id}`, {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //   handleDeleteTask(id)
  // }

  const handleDelete = () => {
    fetch(`http://127.0.0.1:3000/tasks/${id}`, 
        { method: "DELETE" })
    .then(() => removeTodo(id))
    
}


  const handleDone = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div>
      <form className="todos__single" onSubmit={(e) => handleEdit(e, todo.id)}>
        {edit ? (
          <input
            value={editTodo}
            onChange={(e) => setEditTodo(e.target.value)}
            className="todos__single--text" />
        ) : todo.completed ? (
          <s className="todos__single--text"
          value={todo.name} />
        ) : (
          <span className="todos__single--text" value={todo.name}/>
        )}
        <div>
          <span
            className="icon"
            onClick={() => {
              if (!edit && !todo.completed) {
                setEdit(!edit);
              }
            } }
          >
            <AiFillEdit />
          </span>
          <span className="icon" onClick={handleDelete}>
            <AiFillDelete />
          </span>
          <span className="icon" onClick={() => handleDone(todo.id)}>
            <MdDone />
          </span>
        </div>
      </form>
    </div>
  );
};

export default OneTodoCard;
