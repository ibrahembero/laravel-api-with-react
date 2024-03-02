import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../AuthContext";
import { Navigate, useNavigate } from "react-router-dom";


const SignUp = () => {
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
        <div className="container">
           {authContext.auth ? <Navigate to={'/'}/> : <Navigate to={'/sign-up'}/> || <Navigate to={'/login'}/> }

            <h2>Sign Up Page</h2>
            <form onSubmit={handleSubmit} >
                <div className="mb-3">
                    <label className="form-label">name :</label><br/>
                    <input type={'text'} className="form-control" name="name" value={data.name}   onChange={handleChange} placeholder="name"/>
                    {userErrors.name && <div className="alert alert-danger">{userErrors.name}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">email :</label><br/>
                    <input type={'email'} className="form-control" name="email" value={data.email}   onChange={handleChange} placeholder="email"/>
                    {userErrors.email && <div className="alert alert-danger">{userErrors.email}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Password :</label><br/>
                    <input type={'password'} className="form-control" name="password" value={data.password}   onChange={handleChange} placeholder="Password"/>
                    {userErrors.password && <div className="alert alert-danger">{userErrors.password}</div>}
                </div>
                <br/>
                <button type="submit" className="btn btn-success">Submit</button>
            </form>
        </div>
    )
 }

 export default SignUp;