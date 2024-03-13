import React, { useContext } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import '../css/home.css'

function Home(){
    const authContext = useContext(AuthContext);
    
    return (
        <div class="grid-container">
            <div class="grid-item1">
               <p className='pic'>Picture</p>
                {/* <img src="flower.jpg" alt="Picture" class="image" /> */}
            </div>
            <div class="grid-item2 grid">
                <div></div>
                <div >
                    <button type="button"><NavLink className="navbar-brand" to={'/login'}>Login</NavLink></button>
                </div>
                <div >
                <button type="button"><NavLink className="navbar-brand" to={'/sign-up'}>Register</NavLink></button>
                </div>  
                <p className='copy'>Copyright &copy; 2024 Company</p>
            </div>
        </div>
        
    )
}

export default Home;