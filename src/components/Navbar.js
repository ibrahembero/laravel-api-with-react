import React, { useContext, useEffect } from 'react';
import { NavLink, useNavigate} from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import axios from 'axios';

function Navbar(){

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
                // window.location.href('/login')
                // navigate('/login');
            })
            .catch(err => console.log(err));
           

        
    }
    useEffect(()=>{

    },[tok])

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
            <NavLink to={'/'} className="navbar-brand" >Home Page</NavLink>
            {/* <NavLink to={''} className="nav-link active" aria-current="page" >Users</NavLink> */}
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                {authContext.auth ?
                <ul className="navbar-nav">
                      <li className="nav-item">
                        <NavLink to={'/posts'} className="navbar-brand" >Posts</NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink to={'/personal-info'} className="navbar-brand" >personal info</NavLink>
                      </li>
                      <li className="nav-item">
                        <button className='btn btn-danger btn-sm' onClick={logout}>Logout</button>
                      </li>
                </ul>:
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <NavLink to={'/sign-up'} className="nav-link">Sign up</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink to={'/login'} className="nav-link" >Log in</NavLink>
                    </li>
           
                </ul>
                }
                    
                </div>
            </div>
        </nav>
    )
}

export default Navbar;