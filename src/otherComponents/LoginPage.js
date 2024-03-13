import React, { useContext, useEffect, useState } from 'react';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import '../css/login.css'
import axios from 'axios';

function LoginPage(){
    const apiUrl = 'http://127.0.0.1:8000/api';
    const endPoint = '/login';
    const navigate = useNavigate()
   const [data,setData] = useState({
    email : '',
    password : '',
   });
   const [userErrors,setUserErrors] = useState({}) ;
   const validate = ()=>{
    const errors = {};
        
        if(!data.email) errors['email'] ="email is required..";
        if(!data.password) errors['password'] ="password is required..";
        
        return Object.keys(errors).length > 0 ? errors : null; 
       
   }

   const validateOne = target=>{
    if(target.name === 'email'){
        if(!data.email) return userErrors['email'] ="email is required..";
    }else if(target.name === 'password'){
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
        const email = e.target.email.value;
        const password = e.target.password.value;
        const errors = validate();
        const {name , value } = e.target ;
        if(errors) return setUserErrors({...errors,[name]:value});
        else setUserErrors({});
        const {data} = await axios.post(apiUrl+endPoint,{email ,password});
        console.log(data)
        if(data.success === false){
            alert(data.message)
        }else{
            localStorage.setItem('data',data);
            authContext.setAuth({data});
            console.log(localStorage.getItem('data'))
            window.location.reload()
            // window.location.href('/')
            // navigate('/');
        }
        
};
useEffect(()=>{

},[tok])
    
    return (
        <main className="main">
             {tok ? <Navigate to={'/home'}/> : <Navigate to={'/login'}/>}
        <section className="content"> 
            <p className="subscribe">Subscribe White</p>
            <h1>Welcome back! Glad to see you, Again!</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <input type="text" id="email" name="email"  value={data.email}   onChange={handleChange} placeholder="Enter your email" />
                {userErrors.email && <div className="alert alert-danger">{userErrors.email}</div>}
                <input type="password" id="password" name="password" value={data.password}   onChange={handleChange} placeholder="Enter your password" />
                {userErrors.password && <div className="alert alert-danger">{userErrors.password}</div>}
                <a href="#" className="forgot-password">Forgot Password</a>
                <button type="submit">Login</button>
                <p>Or Login with</p>
                <button type="button" className="social-login google">G</button>
            </form>
            <p className="register">Don't have an account? <NavLink className={' back'} to={'/sign-up'}>Register</NavLink></p>
            <p className='register'>Copyright &copy; 2024 Company</p>
            <NavLink className={' back'} to={'/'}>Go Back</NavLink>
        </section>
    </main>
        
    )
}

export default LoginPage;