import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import { Link, Navigate, json } from 'react-router-dom';
import PostDetails from './PostDetails';
import "../css/posts.css"
import Nav from '../otherComponents/Nav';


function Posts(){
    
    const apiUrl = 'http://127.0.0.1:8000/api';
    const endPoint = '/allposts';
    const authContext = useContext(AuthContext);
    const tok = authContext.auth;
    const [blogs,setBlogs] = useState([]);
    const [user,setUser] = useState({});
    const [id,setId] = useState();
    const getInfo = () =>{
         axios.get(
            apiUrl+endPoint,
            {
                headers: {
                "Authorization" : `Bearer ${tok}`,
                "Accept" : "application/json",
                "Content-Type" : "application/json"
                }
            }
    )
    .then(data => {
        console.log(data.data.posts)
        setBlogs(data.data.posts)
    })
    .catch(err => console.log(err))
    }

    const getUserInfo = async () =>{
        await axios.get(
            apiUrl+'/info',
            {
                headers: {
                "Authorization" : `Bearer ${tok}`,
                "Accept" : "application/json",
                "Content-Type" : "application/json"
                }
            }
    ).then(res=> {
        setUser(res.data)
        setId(res.data.user.id)
        console.log(user)
    }
    ).catch(err =>console.log(err))
    }

    console.log(blogs);
    // const id = user.user.id;
    console.log(id);
    const postShow = blogs.map((blog,index) => <PostDetails key={index} post_id={blog.id} name={blog.name} description={blog.description} user_id={blog.user_id} user_auth_id={id} />)
    // useEffect(()=>{
    //     getInfo();
    //     getUserInfo()
    // },[]);
    useEffect(()=>{
        getInfo();
        getUserInfo()
    },[postShow]);
    

   
    return (
        
        <div className='main-content-posts'>
            <Nav />
            <div className='container'>
                
                <div className='container header-main-posts'>
                {authContext.auth ? <div className='container' style={{textAlign:"center"}}><h1>Welcome To Our Website</h1></div> : <Navigate to={'/login'}/>}

                    <div className='row'>
                        <div className='col'>
                            <h2>All Posts</h2>
                        </div>
                        <div className='col'>
                        <Link className="btn btn-success" to={'/create'} >Create Your Own Post</Link>
                        </div>
                    </div>
                </div>
                <div className="smoothie-grid">
                  {postShow}
                </div>
            </div>
        </div>
    )
}

export default Posts;