import axios from 'axios';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';

function UploadImage(){

    const apiUrl = 'http://127.0.0.1:8000/api';
    const endPoint = '/upload';
    const [image,setImage] = useState();
    const authContext = useContext(AuthContext);
    const tok = authContext.auth;
    const navigate= useNavigate();

    // function handleImage(e){
    //     console.log(e.target.file)
    //     console.log(e.target.file.value)
    //     setImage(e.target.file.value)
    // }
    // function handleApi(){
    //     // const formData = new FormData()
    //     // formData.append('image',image) 
    //     axios.post(apiUrl+endPoint,image,
    //         {
    //             headers: {
    //             "Authorization" : `Bearer ${tok}`,
    //             "Accept" : "application/json",
    //             "Content-Type" : "application/json"
    //             }
    //         }
    //         ).then((res) =>{
    //         console.log(res.data)
    //     }).catch(err => console.log(err))
    // }

    const handleSubmit = async e =>{
        e.preventDefault()
        // const image = e.target.image.value;
        const fd = new FormData()
        fd.append('image',image)
        console.log(image)
        const {data} = await axios.post(apiUrl+endPoint,fd,
            {
                headers: {
                "Authorization" : `Bearer ${tok}`,
                "Content-Type" : "multipart/form-data"
                }
            }
            );
            console.log(data);
            navigate('/personal-info')
        
        
};

    return (
    
        <div className="container">
             {authContext.auth ? <div className='container'><h1>Welcome To Our Website</h1></div> : <Navigate to={'/login'}/>}

            {/* <h2>Upload Image Profile</h2>
            <input type='file' name='file' onChange={handleImage} />
            <button onClick={handleApi}>Submit</button> */}
            <form onSubmit={handleSubmit} encType="multipart/form-data" >
                <div className="mb-3">
                    <label className="form-label">Image :</label><br/>
                    <input type='file' className="form-control" name="image" onChange={e => setImage(e.target.files[0])} />
                </div>
                <br/>
                <button type="submit" className="btn btn-success">Submit</button>
            </form>
        </div>

    )
}

export default UploadImage;