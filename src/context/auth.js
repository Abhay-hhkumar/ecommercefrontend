import axios from "axios";
import { useState,useEffect, createContext, useContext } from "react";
const AuthContext = createContext();

const AuthProvider = ({children})=>{

    const [auth, setAuth]=useState( {
                                      user:null,
                                      token:"",
                                     });


    axios.defaults.headers.common['Authorization']=auth?.token   

    // keep the person logged in even after page is refresh
    useEffect(()=>{
        const data=localStorage.getItem("auth");
        if(data){
        const parseData=JSON.parse(data);
        setAuth({
                ...auth,
                user: parseData.user,
                token: parseData.token,
            })
        }
    },[]);
    return(
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    );
};

// custom hook
const useAuth = ()=> useContext(AuthContext);
export { useAuth, AuthProvider};