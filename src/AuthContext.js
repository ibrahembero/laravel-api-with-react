import React, { useEffect, useState } from "react";

export const AuthContext = React.createContext();

export function AuthProvider(Props){
    const [auth,setAuth] = useState({});
    useEffect(()=>{
        const token = localStorage.getItem('data');
        if(token){
            console.log(token)
            setAuth(token)
        }else{
            setAuth()
            console.log("there is no token")
        }
        
    },[])
    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {Props.children}
        </AuthContext.Provider>
    );
}