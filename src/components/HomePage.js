import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

function HomePage(){
    const authContext = useContext(AuthContext);
    
    return (
        <div>
            {authContext.auth ? <div className='container'><h1>Welcome To Our Website</h1></div> : <Navigate to={'/login'}/>}
            <h1>Home Page</h1>
        </div>
        
    )
}

export default HomePage;