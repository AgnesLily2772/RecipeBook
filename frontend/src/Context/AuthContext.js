import { createContext,useReducer } from "react";
import { initialState, authReducer } from '../Reducers/AuthReducer.js';
import { login, logout } from '../Reducers/AuthActions.js';

const AuthContext = createContext(null)

const AuthDataContext = ({children}) => {
        const [authState, dispatch] = useReducer(authReducer, initialState);
        const data = {
                name:"Agnex",
                authState:authState,
                dispatch:dispatch,
                login:login,
                logout:logout
        }
        return (
                <AuthContext.Provider value={data}>
                        {children}
                </AuthContext.Provider>
        )
}
export {AuthContext,AuthDataContext}