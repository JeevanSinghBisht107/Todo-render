import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='HomeContainer'>
        <div className="HomeElement">
           <li>Welcome</li>
            <p>Create, Edit and Delete Your Todo's</p>
            <div className='btnContainer'>
                <Link to='/login' >
                    <button>Login</button>
                </Link>
                <Link to='/signup' >
                    <button>Signup</button>
                </Link>
            </div> 
        </div>    
    </div>
  )
}

export default Home