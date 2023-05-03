import React, { useRef, useState } from "react";

import "../styles.css"


//const initialValues = { name: "" };

const InputField = ({ todo, setTodo, handleAdd}) => {

  const handleClear = () => {
    setTodo({
      ...todo,
      name: ""
    });
  };



  const inputRef = useRef(null);

  // function handleSubmit(event: React.FormEvent) {
  //   event.preventDefault();
  //   handleAdd(formData);
  //   setFormData(formData);
  // }


  return (
    <form
      className="input"
      onSubmit={handleAdd
      }
    >
      <input
        ref={inputRef}
        type="input"
        value={todo.name}
        onChange={(e) => {
          setTodo({ ...todo, name: e.target.value });
        }}
        required
        placeholder="Enter your task"
        className="input__box"
      />
      <button  onClick={(e) => {
              e.preventDefault();
              handleClear();
            }} className="input__submit" type="submit">
        Go
      </button>
    </form>
  );
};

export default InputField;
