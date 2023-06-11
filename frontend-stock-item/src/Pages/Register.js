import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Register = () => {
    const [ user, setUser ] = useState({username:"", password:"" });
    const navigate = useNavigate();
    const navigateToLogin = ()=>{
        navigate("/login")
    }

    const register = async(e)=>{
        e.preventDefault();
        console.log(user);

        try {
            const url = "http://localhost:8080/register"
            const body = { username:user.username, password:user.password };
            const config = { "Content-type" : "application/json" };
            const {data, status} =  await axios.post(url, body, config);
            if(status === 200 ){
                localStorage.setItem("token", data.token);
                Swal.fire({
                  icon: "success",
                  title: 'Sukses Register',
                  text: `Silahkan Login Terlebih Dahulu 😽 `,
                })

                navigate("/login");
            }
        } catch (error) {
            const { response } = error;
            console.log(response);
            if(response === 500){
                Swal.fire({
                    icon: 'error',
                    title: 'Upps 🤭...',
                    text: ' Username anda sudah ada 😥',
                  })
            }
          Swal.fire({
            icon: 'error',
            title: 'Upps 🤭...',
            text: ' Password harus berupa angka simbol dan Huruf besar 😥',
          })
            
            
        }
    }

    const onChange = (e)=>{
        e.preventDefault();

        setUser(currUser=>{
            return {...currUser, [e.target.id]:e.target.value}
        })

    }
    return (
        <div className='container-parent-login'>
        <div className="container-login">
          <h2 className='h2-login'>Register</h2>
          <form className='form-login' >
            <input
              id='username'
              type="email"
              className='input-login'
              placeholder="Email"
              value={user.username}
              onChange={onChange}
            />
            <input
              id='password'
              className='input-login'
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={onChange}
            />
            
            
            <button  className='button-login' onClick={register}   >Login</button>
            <button style={{ marginTop:10}} onClick={navigateToLogin} className='button-login'> Already Have Account? Login Here</button>
            
          </form>
        </div>
      </div>
    );
}

export default Register;
