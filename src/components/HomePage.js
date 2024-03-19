import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import Nav from '../otherComponents/Nav';
import "../css/homePage.css"

function HomePage(){
    const authContext = useContext(AuthContext);
    
    return (
        <div>
                    <Nav />
                <div className='main'>
                    <div className='content'>
                        {authContext.auth ? <div className='container'><h1>Welcome To Our Website</h1></div> : <Navigate to={'/login'}/>}
                        <h1>Home Page</h1>
                    </div>
                </div>
        </div>
        
    )
}

export default HomePage;