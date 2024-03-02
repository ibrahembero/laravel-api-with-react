import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";


const Login = () => {
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
        <div className="container">
           {tok ? <Navigate to={'/'}/> : <Navigate to={'/login'}/>}

            <h2>Login Page</h2>
            <form onSubmit={handleSubmit}>
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

 export default Login;