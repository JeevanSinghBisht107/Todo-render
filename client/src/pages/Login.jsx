import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { MdOutlineMail } from 'react-icons/md'
import { RiLockPasswordLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const PORT = import.meta.env.VITE_API_PORT;
  const[formDetails,setFormDetails] = useState({
    email:"",
    password:""
  })

  let navigate = useNavigate();

  function handleChange(e){
    let { name,value } = e.target;
    setFormDetails({
      ...formDetails,[name]:value
    });
  }
  
  async function handleSubbmit(e){
    e.preventDefault();
    try{
      const response = await axios.post(`http://localhost:${PORT}/auth/login`,formDetails);
    //   console.log(response);
      localStorage.setItem("token",response.data.token)
      toast.success('Logged in');
      navigate('/todos')
      setFormDetails({
        email:"",
        password:""
      })
    }catch(error){
       // Check if error.response and error.response.data exist
       if (error.response && error.response.data) {
        // Access and display the specific error message
        toast.error(error.response.data.message)
    } else {
        // Handle generic error (e.g., network error or other issues)
        toast.error(error.message)
    }
    } 
  }

  return (
    <div className='page' >
      <form className='formContainer' onSubmit={handleSubbmit} >
      <h1>Login</h1>
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
        <button>Login</button>
      </form>
    </div>
  )
}

export default Login