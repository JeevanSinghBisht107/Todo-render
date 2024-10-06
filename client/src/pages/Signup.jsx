import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { FaUserAlt } from 'react-icons/fa'
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom'

const Signup = () => {

    const PORT = import.meta.env.VITE_API_PORT;
  const[formDetails,setFormDetails] = useState({
    name:"",
    email:"",
    password:""
  })

  let navigate = useNavigate()

  function handleChange(e){
    let { name,value } = e.target;
    setFormDetails({
      ...formDetails,[name]:value
    });
  }

  async function handleSubbmit(e){
    e.preventDefault();
    try{
        await axios.post(`http://localhost:${PORT}/auth/add`,formDetails)
        toast.success('User Registered');
        navigate('/login')
        setFormDetails({
          name: "",
          email: "",
          password: ""
        })
      }catch(error){
       toast.error(error.response.data.message)
      }
  }

    return (
        <div className='page' >
          <form className='formContainer' onSubmit={handleSubbmit} >
          <h1>Sign up</h1>
          <div className='formElement' >
          <FaUserAlt />
            <input type="text" 
            placeholder='Your Name' 
            name='name'
            value={formDetails.name}
            onChange={handleChange}
            required />
          </div>
          <div className='formElement' >
          <MdOutlineMail />
          <input type="email" 
          placeholder='Your Email' 
          name='email'
          value={formDetails.email}
          onChange={handleChange}
          required />
          </div>
          <div className='formElement' >
          <RiLockPasswordLine />
          <input type="password"
           placeholder='Password' 
           name='password'
           value={formDetails.password}
           onChange={handleChange}
           required/>
          </div >
            <button>Register</button>
          </form>
        </div>
      )
}

export default Signup