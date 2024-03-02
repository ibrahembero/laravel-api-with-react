import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import axios from 'axios';

function EditPost(){

    const {id} = useParams();
    const navigate = useNavigate();
    const apiUrl = 'http://127.0.0.1:8000/api';
    const endPoint = '/edit/';
    const authContext = useContext(AuthContext);
    const tok = authContext.auth;
    const [post , setPost] = useState()
    const getPost = async()=>{
        await axios.get(apiUrl+endPoint+id,
            {
                headers: {
                "Authorization" : `Bearer ${tok}`,
                "Accept" : "application/json",
                "Content-Type" : "application/json"
                }
            }).then(res => {
                setPost(res.data)
                // console.log(res.data)
                console.log(post)
            })
            .catch(err => console.log(err));
    }
    useEffect(()=>{
        getPost();
    },[])
    

    
    const handleSubmit = async e =>{
        e.preventDefault()
        const name = e.target.name.value;
        const description = e.target.description.value;
        // console.log(`post name is ${name}, and the description is ${description}`);
        await axios.post(apiUrl+'/update/'+id,{name ,description},
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
            <h1>Edit Post with ID {id}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label"> Name :</label><br/>
                    <input type={'name'} className="form-control" name="name" defaultValue={post ?post.name: ''} />
                   </div>
                <div className="mb-3">
                    <label className="form-label">Description :</label><br/>
                    <input type={'description'} className="form-control" name="description" defaultValue={post ? post.description : ''}  />
                   </div>
                <br/>
                <button type="submit" className="btn btn-success">Update</button>
            </form>
        </div>
    )
}

export default EditPost;