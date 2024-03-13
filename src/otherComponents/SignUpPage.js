import React, { useContext, useState } from 'react';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import '../css/login.css'
import axios from 'axios';

function SignUpPage(){
    const apiUrl = 'http://127.0.0.1:8000/api';
    const endPoint = '/register';
    const navigate = useNavigate();
    const [data,setData] = useState({
        name : '',
        email : '',
        password : '',
    });
   const [userErrors,setUserErrors] = useState({}) ;
   const validate = ()=>{
    const errors = {};
        
        if(!data.name) errors['name'] ="name is required..";
        if(!data.email) errors['email'] ="email is required..";
        if(!data.password) errors['password'] ="password is required..";
        
        return Object.keys(errors).length > 0 ? errors : null; 
       
   }

   const validateOne = target=>{
    if(target.name === 'name'){
        if(!data.name) return userErrors['name'] ="name is required..";
    }else if(target.name === 'email'){
        if(!data.email) return userErrors['email'] ="email is required..";
    }
    else if(target.name === 'password'){
        if(!data.password) return userErrors['password'] = "password is required";
    }
}

   const handleChange = (e)=>{
        const {name , value} = e.target
        setData({...data,[name]:value})
        // console.log(data)
        const clonedErrors = {...userErrors} ;
        const errMsg = validateOne(e.target);
        errMsg ? clonedErrors[e.target.name]= errMsg: delete clonedErrors[e.target.name];
        setUserErrors(clonedErrors);
        // console.log(errMsg)
   }
 //context
 const authContext = useContext(AuthContext);
 const tok = authContext.auth;
 //// Handle submit function
 const handleSubmit = async e =>{
     e.preventDefault()
     const name = e.target.name.value;
     const email = e.target.email.value;
     const password = e.target.password.value;
     const errors = validate();
     const {nameErr , value } = e.target ;
     if(errors) return setUserErrors({...errors,[nameErr]:value});
     else setUserErrors({});
     const {data} = await axios.post(apiUrl+endPoint,{name,email ,password});
     console.log(data);
     alert(data.message)
     const tok = data.token;
     localStorage.setItem('data',data.token);
     authContext.setAuth({tok});
     console.log(localStorage.getItem('data'))
     window.location.reload()
    //  window.location.href('/')
    //  navigate('/');
  
     
};
    
    return (
        <main class="main">
             {tok ? <Navigate to={'/home'}/> : <Navigate to={'/login'}/>}
        <section class="content"> 
            <p class="subscribe">Subscribe White</p>
            <h1>Hello! Register To Get Started</h1>
            <form onSubmit={handleSubmit} class="login-form">
                <input type="text" id="name" name="name" value={data.name}   onChange={handleChange} placeholder="Enter your name" />
                {userErrors.name && <div className="alert alert-danger">{userErrors.name}</div>}
                <input type="text" id="email" name="email" value={data.email}   onChange={handleChange} placeholder="Enter your email" />
                {userErrors.email && <div className="alert alert-danger">{userErrors.email}</div>}
                <input type="password" id="password" name="password" value={data.password}   onChange={handleChange} placeholder="Enter your password" />
                {userErrors.password && <div className="alert alert-danger">{userErrors.password}</div>}
                <button type="submit">Register</button>
                <p>Or Login with</p>
                <button type="button" class="social-login google">G</button>
            </form>
            <p class="register">Already have an account?  <NavLink className={' back'} to={'/login'}>Login</NavLink></p>
            <p className='register'>Copyright &copy; 2024 Company</p>
            <NavLink className={' back'} to={'/'}>Go Back</NavLink>
        </section>
    </main>
        
    )
}

export default SignUpPage;