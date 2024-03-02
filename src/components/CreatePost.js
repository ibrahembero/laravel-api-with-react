import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import axios from 'axios';

function CreatePost(){

    const apiUrl = 'http://127.0.0.1:8000/api';
    const endPoint = '/create';
    const authContext = useContext(AuthContext);
    const tok = authContext.auth;
    const navigate = useNavigate()
    // useEffect(()=>{
       
    // },[])
    

    
    const handleSubmit = async e =>{
        e.preventDefault()
        const name = e.target.name.value;
        const description = e.target.description.value;
        // console.log(`post name is ${name}, and the description is ${description}`);
        await axios.post(apiUrl+endPoint,{name ,description},
        {
            headers: {
            "Authorization" : `Bearer ${tok}`,
            "Accept" : "application/json",
            "Content-Type" : "application/json"
            }
        }
        ).then(res => {
            console.log(res.data)
        })
        .catch(err => console.log(err));
       
        
        
        navigate('/posts');
};

    return (
        <div className='container'>
            {authContext.auth ? <div className='container'><h1>Welcome To Our Website</h1></div> : <Navigate to={'/login'}/>}
            <h1>Create Post </h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label"> Name :</label><br/>
                    <input type={'name'} className="form-control" name="name" />
                   </div>
                <div className="mb-3">
                    <label className="form-label">Description :</label><br/>
                    <input type={'description'} className="form-control" name="description" />
                   </div>
                <br/>
                <button type="submit" className="btn btn-success">Create</button>
            </form>
        </div>
    )
}

export default CreatePost;