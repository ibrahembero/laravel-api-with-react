// import { Component, useRef } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
// import { Main } from './main';
import Navbar from './components/Navbar';
import Login from './components/Login';
import { useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import SignUp from './components/SignUp';
import axios from 'axios';
import HomePage from './components/HomePage';
import { AuthProvider,AuthContext } from './AuthContext';
// import "core-js/stable/atob"
// import {decode} from "base-64"
import PersonalInfo from './components/PersonalInfo';
import UploadImage from './components/UploadImage';
import Posts from './components/Posts';
import EditPost from './components/EditPost';
import CreatePost from './components/CreatePost';
import Home from './otherComponents/Home';
import LoginPage from './otherComponents/LoginPage';
import SignUpPage from './otherComponents/SignUpPage';

const NotFound = ()=>{
  return <h1>Not Found</h1>
}

function App() {
  const authContext = useContext(AuthContext);
//   const apiUrl = 'http://127.0.0.1:8000/api';
//   const endPoint = '/info';
// useEffect(()=>{
  // const data = localStorage.getItem('data');
  // if(!data) return;
//   (async e =>{
//     const token = await axios.post(apiUrl+endPoint,{'token':data});
//     console.log(token)
//   })();
//   console.log(data)

// })
useEffect(()=>{
  const data = localStorage.getItem('data');
  if(!data){ 
      return;
    }
})

  return (
    
      <div className="App">
        <BrowserRouter>
          {/* <Navbar /> */}
          {/* {authContext.auth ? <div className='container'><h1>Welcome To Our Website</h1></div> : <Navigate to={'/login'}/>}  */}
          {/* <Navbar authToken={authToken} />  */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/home" element={<HomePage />} />
            {/* <Route path="/" element={<HomePage />} /> */}
            <Route path="/create" element={<CreatePost />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/personal-info" element={<PersonalInfo />} />
            {/* <Route path="/sign-up" element={<SignUp />} /> */}
            {/* <Route path="/login" element={<Login />} /> */}
            <Route path="/uploadImage" element={<UploadImage />} />
            <Route  path="/not-found" element={<NotFound />}/>
            <Route  path="*" element={<Navigate to={'/not-found'}/>}/>
          </Routes>
        </BrowserRouter>
      </div>
  
  );
}

function AppWithStore(){
  return (
      <AuthProvider>
        <App />
      </AuthProvider>
  );
}

export default AppWithStore;
