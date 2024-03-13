import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

function Home(){
    const authContext = useContext(AuthContext);
    
    return (
        <div className='grid'>
          <div className='grid-item1'>one</div>
          <div className='grid-item2'>two</div>
        </div>
        
    )
}

export default Home;