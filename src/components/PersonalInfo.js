import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import { NavLink, Navigate, json } from 'react-router-dom';
import Nav from '../otherComponents/Nav';
import "../css/pesonalInfo.css"

function PersonalInfo(){
    const apiUrl = 'http://127.0.0.1:8000/api';
    const endPoint = '/info';
    const authContext = useContext(AuthContext);
    const tok = authContext.auth;
    // console.log(tok);
    const [user,setUser] = useState(null);
    const getInfo = async() =>{
        await axios.get(
            apiUrl+endPoint,
            {
                headers: {
                "Authorization" : `Bearer ${tok}`,
                "Accept" : "application/json",
                "Content-Type" : "application/json"
                }
            }
    ).then(res=> setUser(res.data)
    ).catch(err =>console.log(err))
    }

    // const intervalid = setInterval(() => {
        //     getInfo();
        // }, 120000);
        // return () => clearInterval={intervalid}
    useEffect(()=>{
        getInfo();
       
    },[tok]);

    // const handleSubmit = async e =>{ 
    //     e.preventDefault()
    //     const image = e.target.image.value;
    //     console.log(image)
        
    //     await axios.post('http://127.0.0.1:8000/api/upload',{image},{
    //              headers: {
    //             "Authorization" : `Bearer ${tok}`,
    //             "Accept" : "application/json",
    //             "Content-Type" : "application/json"
    //             }
    //         }
        
    //     ).then(res => {
    //         console.log(res)
    //         // getInfo()
    //     })
    //     .catch(err => console.log(err));
        
    // }
    
    return (
        <div>
            <Nav />
            {user ?
            <div className='main-section'>
                <div className='content-section'>
                    <div className='container'>
                        <div className='row'>
                            <h1 className='perinfo'>Personal Info</h1>
                            {authContext.auth ? <div className='container'><h1 className='perinfo'>Welcome To Our Website</h1></div> : <Navigate to={'/login'}/>}
                        </div>
                        <div className='row'>
                            <div className='col'>
                                {/* <p>hello</p> */}
                                {/* <p>id : {user.user.id}</p> */}
                                <p>Name : {user.user.email}</p>
                                <img src={'http://127.0.0.1:8000/storage/'+user.user.image} className='img-design' alt='there is no photo'/>
                            </div>
                            <div className='col'>
                            <button className='btn btn-success upload-image'><NavLink to={'/uploadImage'} className="nav-link" >Upload Image</NavLink></button>
                            </div>
                        </div>
                    </div>
                    </div>
            </div>
                  :"loading please wait" }         
        </div>
    )
}

export default PersonalInfo;