import { createContext,useEffect,useReducer, useState } from "react";
import { initialState, authReducer } from '../Reducers/AuthReducer.js';
import { login, logout } from '../Reducers/AuthActions.js';
import Cookies from "js-cookie"
const AuthContext = createContext(null)

const AuthDataContext = ({children}) => {

        const [userState,setUserState]  = useState(false)  
        const [authState, dispatch] = useReducer(authReducer, initialState);
        useEffect(()=>{
                if(Cookies.get("jwtoken")) setUserState(true)
        },[])
        const data = {
                name:"Agnes Lily",
                authState:authState,
                dispatch:dispatch,
                login:login,
                logout:logout,
                userState,
                setUserState
        }
        return (
                <AuthContext.Provider value={data}>
                        {children}
                </AuthContext.Provider>
        )
}
export {AuthContext,AuthDataContext}