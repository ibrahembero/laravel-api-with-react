import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

export default function PostDetails(props){


    const apiUrl = 'http://127.0.0.1:8000/api';
    const endPoint = '/delete/';
    const authContext = useContext(AuthContext);
    const tok = authContext.auth;
    const navigate = useNavigate();
  
    const id = props.post_id;
    const handleDelete = async (postID)=>{
        
        await axios.delete(apiUrl+endPoint+postID,
        {
            headers: {
            "Authorization" : `Bearer ${tok}`,
            "Accept" : "application/json",
            "Content-Type" : "application/json"
            }
        }
        ).then(res => {
            console.log(res.data);
            navigate('/');
        })
        .catch(err => console.log(err));
        // window.location.reload()
        
        
        
       
    }

    return (
        <div>
            <div className="card card-width" >
                <div className="card-body" >
                {/* <h5>{id}</h5> */}
                <h5 className="card-title">{props.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{props.name}</h6>
                {/* <p>{props.user_auth_id}</p> */}
                <p className="card-text">{props.description}</p>
                {/* <p>{props.user_id}</p> */}
                {props.user_auth_id === props.user_id ?
                    <div>
                        <Link className="btn btn-success"  to={`/edit/${id}`}>Edit</Link>
                        <button className="btn btn-danger" onClick={()=>handleDelete(id)} >delete</button>
                    </div>
                    : <p></p>}
                
                </div>
            </div>
            <hr/>
        </div>
        
    )
}