import React, { useContext, useEffect } from 'react';
import '../css/nav.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import axios from 'axios';

function Nav(){
    const authContext = useContext(AuthContext);
    const tok = authContext.auth;
    const apiUrl = 'http://127.0.0.1:8000/api';
    const endPoint = '/logout';
    const navigate = useNavigate();


    const logout = async()=>{
        // localStorage.removeItem('data');
        // authContext.setAuth({})
        console.log("logout");
        await axios.delete(apiUrl+endPoint,
            {
                headers: {
                "Authorization" : `Bearer ${tok}`,
                "Accept" : "application/json",
                "Content-Type" : "application/json"
                }
            }).then(res => {
                console.log(res.data);
                localStorage.removeItem('data');
                authContext.setAuth({})
                window.location.reload()
               
            })
            .catch(err => console.log(err));
           

        
    }
    useEffect(()=>{

    },[tok])

    
    return (
        <div className='navbar'>
            <div className='logo'>
                Subscribe White
            </div>
            <ul className='navbar-menu'>
                <li><NavLink to={'/home'}>Home</NavLink></li>
                <li><NavLink to={'/posts'}>Posts</NavLink></li>
                <li><NavLink to={'/personal-info'}>Personal Info</NavLink></li>
                <li><button className='btn btn-danger btn-sm btn-logout' onClick={logout}>Logout</button></li>
            </ul>
        </div>
        
    )
}

export default Nav;