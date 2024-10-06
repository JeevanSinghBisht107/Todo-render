import React from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md"

const Todos = ({alltodos,editTodo,deleteTodo}) => {
  return (
    <>
        {
            alltodos?.map((todo)=>{
                return(
                    <article key={todo._id} className='todolist' >
                        <h1>{todo.description}</h1>
                        <button className='edit' onClick={()=>editTodo(todo._id)} ><FaEdit /></button>
                        <button className='delete' onClick={()=>deleteTodo(todo._id)} > <MdDelete /></button>
                    </article>
                );
            })
        }
    </>
  )
}

export default Todos;