import React, { useRef, useState, useEffect } from "react";
import TodoItems from "./TodoItems";

const Todo = () => {

  const [todoList, setTodoList] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [] );

  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();

    if(inputText === ""){
      return null;
    }
    
    const newTodo = {
      id: Date.now(),
      text: inputText,
      status: false,
    }

    setTodoList((prev)=> [...prev, newTodo]);
    inputRef.current.value = "";
  };

  const deleteTodo = (id)=>{
    setTodoList((prev)=>{
      return prev.filter((todo) => todo.id !== id )
    })
  }

  const toggle = (id) =>{
    setTodoList((prev)=>{
      return prev.map((todo)=>{
        if(todo.id === id){
          return {...todo, status: !todo.status }
        }
        return todo;
      })
    })
  }

  const deleteAll = ()=>{
    setTodoList([]);  // Borra todas las tareas en el estado
    localStorage.removeItem("todos"); // También limpia el localStorage
  }

  useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todoList))
  }, [todoList])

  return(
    <div className="bg-white place-self-center w-90 max-w-md flex flex-col p-7 min-h-[550px]">
      
      {/* TITLE */}
      <div className="flex items-center justify-center mt-7 gap-2 ">
        <h1 className="text-2xl font-semibold ">Todo List 🎯</h1>
      </div>

      {/* INPUT BOX */}
      <div className="flex items-center my-7 bg-gray-200">
        <input ref={inputRef} className="outline-none flex-1 h-14 pl-4 placeholder:text-gray-400" type="text" placeholder="Add your task" onKeyDown={(e) => e.key === "Enter" && add()} />
        <button onClick={add} className="border-none bg-blue-600 w-32 h-14 text-white text-lg font-medium cursor-pointer">Add +</button>
      </div>

      {/* TODO LIST */}
      <div className="flex-grow">
        {
          todoList.map((item, index)=>{
            return <TodoItems key={index} text={item.text} id={item.id} status={item.status} deleteTodo={deleteTodo} toggle={toggle}/>
          })
        }
        
      </div>

{/* Empuja "Try" hasta abajo */}
    <div className="mt-auto flex flex-col items-center">
      <p className="text-center">Tasks: {todoList.length} | Completed: { todoList.filter(items=> items.status).length} | Pending: {todoList.filter((item)=>{return !item.status}).length}</p>
      <button onClick={deleteAll} className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition">Delete all</button>
    </div>

    </div>
  ) 
};

{/* flex flex-col en el contenedor principal organiza los elementos en columna.
flex-grow en la lista de tareas para que ocupe todo el espacio disponible y empuje los elementos siguientes hacia abajo.
mt-auto en el div de "Try" para que siempre quede al fondo. */}

export default Todo;
