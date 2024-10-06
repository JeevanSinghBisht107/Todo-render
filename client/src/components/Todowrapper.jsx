import React, { useState, useEffect } from "react";
import Createtodo from "./Createtodo";
import Todos from "./Todos";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Todowrapper = () => {
  const PORT = import.meta.env.VITE_API_PORT;
  const [todos, setTodos] = useState({
    description: "",
    toggle: false
  });
  const [alltodos, setAllTodos] = useState(null);

  let [id, setId] = useState(false);

  let [noData, setNoData] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:${PORT}/todo/all`,{
          headers:{
            Authorization: `Bearer ${token}`
          }
        });

        let { findAlltodo } = response.data;
        if (findAlltodo.length === 0) {
          setNoData(true);
        } else {
          setNoData(false);
          setAllTodos(findAlltodo);
        }
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, [id]);

  function deleteTodo(id) {
    const token = localStorage.getItem("token");
    axios.delete(`http://localhost:${PORT}/todo/delete/${id}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    }).then(() => {
      toast.success("Todo deleted")
      setId(id);
    });
  }

  function editTodo(id) {
    let val = alltodos.find((x) => {
      return x._id === id;
    });
    setTodos({ description: val.description, toggle: true });

    let filteredTodo = alltodos.filter((x) => {
      return x._id !== id;
    });
    setAllTodos(filteredTodo);

    sessionStorage.setItem("id", id);
  }

  function handleLogout(){
    localStorage.removeItem("token");
    navigate("/")
    toast.success("User Logged out")
  }

  return (
    <div className="todoContainer">
      <h1>Add your Todo's</h1>
      <Createtodo
        todos={todos}
        setTodos={setTodos}
        setId={setId}
        id={id}
      ></Createtodo>

      {noData ? (
        <h3>No Todo present</h3>
      ) : (
        <Todos
          alltodos={alltodos}
          editTodo={editTodo}
          deleteTodo={deleteTodo}
        ></Todos>
      )}
        <div className="logoutButton" onClick={handleLogout} >
          <button>
            Logout
          </button>
        </div>
    </div>
  );
};

export default Todowrapper;
