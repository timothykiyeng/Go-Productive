// import React, { useState, useEffect } from "react";
// import "./App.css";

// // import NewTask from "./Components/NewTask";
// // import TodoList from "./Components/TodoList";
// // import { Todo } from "./Components/Todo";
// import Header from "./Components/Header";
// import LandingPage from "./Components/LandingPage";
// import { Route, Routes, redirect } from "react-router-dom";

// import TodoList from "./Components/TodoList";
// // import InputField from "./Components/InputField";
// // import CommentList from "./Components/CommentList";
// // import ShowComment from "./Components/ShowComment";

// //import ReactPaginate from "react-paginate";

// const App = () => {
//   //const [user, setUser] = useState<null>(null);
//   // const [todo, setTodo] = useState("");
//   // const [todos, setTodos] = useState([]);
//   // const [name, setName] = useState<TodoDto>()
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);
//   // const [pageNumber, setPageNumber] = useState(0);

//   // const tasksPerPage = 40;
//   // const pagesVisited = pageNumber * tasksPerPage;

//   // const displayTasks = todos.slice(pagesVisited, pagesVisited + tasksPerPage);

//   useEffect(() => {
//     fetch("http://127.0.0.1:3000/authorized_user").then((r) => {
//       if (r.ok) {
//         r.json().then((user) => {
//           setIsAuthenticated(true);
//           setUser(user);
//         });
//       }
//     });
//   }, []);

//   // useEffect(() => {
//   //   fetch("http://127.0.0.1:3000/tasks")
//   //     .then((response) => response.json())
//   //     .then((todos) => {
//   //       console.log(todos);
//   //       setTodos(todos);
//   //     });
//   // }, []);

//   // const lastTodoIndex = currentPage * todosPerPage;
//   // const firstTodoIndex = lastTodoIndex - todosPerPage;
//   // const currentTodos = todos.slice(firstTodoIndex, lastTodoIndex);

//   // const handleAdd = (e: React.FormEvent) => {
//   //   e.preventDefault();

//   //   if (todo) {
//   //     setTodos([
//   //       ...todos,
//   //       {
//   //         id: todos.length + 1,
//   //         name: todo,
//   //         description: desc,
//   //         completed: false,
//   //         user_id: Date.now(),
//   //       },
//   //     ]);
//   //     setTodo("");
//   //   }
//   // };

//   // function addNewTask(newTask) {
//   //   setTodos((prevState) => [...prevState, newTask]);
//   // }

//   // function handleSubmit(e) {
//   //   e.preventDefault();
//   //   const newTaskObj = {
//   //     todo: todo,
//   //   };
//   //   fetch("http://127.0.0.1:3000/tasks", {
//   //     method: "POST",
//   //     headers: { "Content-Type": "application/json" },
//   //     body: JSON.stringify(newTaskObj),
//   //   })
//   //     .then((response) => response.json())
//   //     .then((data) => addNewTask(data));
//   //   setTodo(todo);
//   //   console.log(newTaskObj);
//   // }

//   if (!isAuthenticated)
//     return (
//       <LandingPage setUser={setUser} setIsAuthenticated={setIsAuthenticated} />
//     );

//   // const pageCount = Math.ceil(todos.length / tasksPerPage);

//   const changePage = (selected) => {
//     setPageNumber(selected);
//   };

//   return (
//     <div className="App">
    

//       <Header user={user} setUser={setUser} setIsAuthenticated={setIsAuthenticated} />
//       {/* <InputField todo={todo} setTodo={setTodo} handleAdd={handleSubmit} /> */}

//       <Routes>
//         {isAuthenticated ? (
//           <Route
//             path="/"
//             element={
//               <TodoList
//               />
//             }
//           />
//         ) : (
//           <Route
//             path="/singup-login"
//             element={
//               <LandingPage
//                 setUser={setUser}
//                 setIsAuthenticated={setIsAuthenticated}
//               />
//             }
//           />
//         )}
//         {/* <Route path="/comments" element={<CommentList user={user} />} />
//         <Route path="/comments/:id" element={<ShowComment />} /> */}
//       </Routes>
//       {/* <ReactPaginate
//         previousLabel={"Previous"}
//         nextLabel={"next"}
//         pageCount={pageCount}
//         onPageChange={changePage}
//         containerClassName={"paginationBttns"}
//         previousLinkClassName={"previousBttn"}
//         nextLinkClassName={"nextBttn"}
//         disabledClassName={"paginationDisabled"}
//         activeClassName={"paginationActive"}
//       /> */}
//     </div>
//   );
// };

// export default App;


import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Components/Header";
import LandingPage from "./Components/LandingPage";
import CommentList from "./Components/CommentList";
import ShowComment from "./Components/ShowComment";


import { Route, Routes } from "react-router-dom";
import TodoList from "./Components/TodoList";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:3000/authorized_user").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setIsAuthenticated(true);
          setUser(user);
        });
      }
    });
  }, []);

  if (!isAuthenticated)
    return (
      <LandingPage setUser={setUser} setIsAuthenticated={setIsAuthenticated} />
    );

    return (
      <div className="App">
        <Header user={user} setUser={setUser} setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          {isAuthenticated ? (
            <Route
              path="/"
              element={
                <>
                  <TodoList user={user}/>
                </>
              }
            />
          ) : (
            <Route
              path="/singup-login"
              element={
                <LandingPage
                  setUser={setUser}
                  setIsAuthenticated={setIsAuthenticated}
                />
              }
            />
          )}
          <Route exact path="/comments" element={<CommentList user={user} />} />
        <Route exact path="/comments/:id" element={<ShowComment />} />
        </Routes>
      </div>
    );
    
};

export default App;
