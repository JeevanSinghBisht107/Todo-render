import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

const Createtodo = ({ id,todos, setTodos ,setId}) => {
  const PORT = import.meta.env.VITE_API_PORT;
  function handleTodo(event) {
    setTodos({ ...todos, description: event.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
      const token = localStorage.getItem("token");
      axios
      .post(`http://localhost:${PORT}/todo/add`, { description: todos.description },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      .then(() => {
        toast.success("Todo added");
        setTodos({description:"",toggle:false})
        setId(!id);
      })
      .catch((err) => {
        console.log(err, "err while creating todo");
      });
    }

    function handleUpdate(e){
      e.preventDefault();
      const token = localStorage.getItem("token");
      let todoid = sessionStorage.getItem("id")
      axios.put(`http://localhost:${PORT}/todo/update/${todoid}`,{ description:todos.description },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      .then(() => {
        toast.success("Todo updated")
        setTodos({description:"",toggle:false})
        setId(!id);       
      })
      .catch((err) => {
        console.log(err, "err while updating todo");
      });
    }

  return (
    <form id="todoform">
      <input
        type="text"
        placeholder="enter todo...."
        value={todos.description}
        onChange={handleTodo}
      />
      <button onClick={ todos.toggle? handleUpdate : handleSubmit}>{todos.toggle? "Update":"Add" }</button>
    </form>
  );
};

export default Createtodo;
