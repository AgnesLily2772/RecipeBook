import React,{useCallback, useEffect,useReducer} from 'react'
import { useNavigate } from 'react-router-dom';
import { logout } from '../Reducers/AuthActions';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { initialState, authReducer } from '../Reducers/AuthReducer.js';

const Signout = () => {
        const [authState, dispatch] = useReducer(authReducer, initialState);
    const navigate = useNavigate();
    const handleSignOut =useCallback( async() => {
        const response =await  axios.get(`http://localhost:5000/api/signout`,{withCredentials:true});
        const data = response.data
        if(response.status === 400 || !data){
                toast.error(data.error,{
                        position: toast.POSITION.BOTTOM_RIGHT,
                        autoClose: 1000,
              })
            }else{
                toast.success("SignOut Successful",{
                        position: toast.POSITION.BOTTOM_RIGHT,
                        autoClose: 1000,
                })
        }
        dispatch(logout());
        navigate('/signin');
    },[dispatch,navigate])
    useEffect(()=>{
        handleSignOut()
},[handleSignOut])
  return (
    <>
    <h1>Signout</h1>
    <ToastContainer/>
    </>
  )
}

export default Signout;