import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

import "./Login.css";
import { NavLink, Navigate } from 'react-router-dom';
import Home from './Home';

import { useNavigate } from 'react-router-dom';

const Login = () => {
    
    const [user, setUser] = useState({ username:"", password:"" });
    const [hasToken, setHasToken] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = (e) => {
      e.preventDefault();
      
     
    };
    const onChangeInput = (e)=>{
      
        setUser(currUser =>{
            return {...currUser, [e.target.id]:e.target.value}
        })
    }

    const login = async(e)=>{
        e.preventDefault();
        console.log(user);

        try {
            const url = "http://localhost:8080/login"
            const body = { username:user.username, password:user.password };
            const config = { "Content-type" : "application/json" };
            const {data, status} =  await axios.post(url, body, config);
            if(status === 200 ){
                localStorage.setItem("token", data.token);
                Swal.fire({
                  icon: "success",
                  title: 'Sukses Login',
                  text: `Silahkan Masuk 😽 `,
                })

                navigate("/");
            }
        } catch (error) {

          console.error(error);
          console.log("Your password or Username Inccorrect");

          Swal.fire({
            icon: 'error',
            title: 'Upps 🤭...',
            text: '"Username Atau Password Salah 😥"',
          })
            
            
        }
    }

    const goingToHome = ()=>{
        const token = localStorage.getItem("token");
        setHasToken(typeof(token) === 'string');
        if(hasToken){
            return(
                <Navigate to="/asdasd" />
            )
        }
        // setHasToken(valueof)
        // if(valueof(token) === "string"){

        // }
    }
    const navigateToRegister = ()=>{
       navigate("/register")
    }

    useEffect(()=>{
        goingToHome();
        console.log("Berhasil Mendapatkan Token");
        console.log(hasToken);

    },[hasToken])
  
    return (
    <div className='container-parent-login'>
      <div className="container-login">
        <h2 className='h2-login'>Login</h2>
        <form className='form-login' >
          <input
            id='username'
            type="email"
            className='input-login'
            placeholder="Email"
            value={user.username}
            onChange={onChangeInput}
          />
          <input
            id='password'
            className='input-login'
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={onChangeInput}
          />
          
            <button onClick={login}  className="button-login">Login</button>
         
          <button style={{ marginTop:10}} onClick={navigateToRegister} className='button-login'> Dont have Account yet? Register here </button>
          
          {/* <NavLink  className='button-login'  onClick={tes} pat >Login</NavLink> */}
        </form>
      </div>
    </div>
    );
}

export default Login;
