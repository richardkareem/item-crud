import React, { useState } from 'react';

import "./Login.css";
import { NavLink } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      
     
    };

    const tes = ()=>{

     const token = localStorage.getItem("token");
      if(token){
       console.log("Welcome");
      }else{
        console.log("wrong id / pw ");
      }
    }
  
    return (
    <div className='container-parent-login'>
      <div className="container-login">
        <h2 className='h2-login'>Login</h2>
        <form className='form-login' onSubmit={handleSubmit}>
          <input
            className='input-login'
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
          
            className='input-login'
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <NavLink to="/" className="button-login"><button  className="button-login">Login</button></NavLink>
          
          {/* <NavLink  className='button-login'  onClick={tes} pat >Login</NavLink> */}
        </form>
      </div>
    </div>
    );
}

export default Login;
