import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Register = () => {
    const [ user, setUser ] = useState({name:"",username:"", password:"" });
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
           const {response} = error;
           const { status } = response;
            console.log(status);
            if(status === 500){
                Swal.fire({
                    icon: 'error',
                    title: 'Upps...',
                    text: ' Username anda sudah ada yang punya 🙀',
                  })
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Upps...',
                text: ' Password harus berupa angka simbol dan Huruf besar 🙀',
              })
            }
         
            
            
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
              id='name'
              type="text"
              className='input-login'
              placeholder="Your Name?"
              value={user.name}
              onChange={onChange}
            />
            <input
              id='username'
              type="text"
              className='input-login'
              placeholder="Username"
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
            
            
            <button  className='button-login' onClick={register}   >Register</button>
            <button style={{ marginTop:10}} onClick={navigateToLogin} className='button-login'> Already Have Account? Login Here</button>
            
          </form>
        </div>
      </div>
    );
}

export default Register;
