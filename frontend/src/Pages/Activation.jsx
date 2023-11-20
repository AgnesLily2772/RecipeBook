import React, {useEffect,useState} from 'react'
import axios from "axios"
import {useLocation,useNavigate} from "react-router-dom"
import {SERVER_URL} from "../Utils/globals"

const Activation = () => {
        const [loading,setLoading] = useState(true)
        const location = useLocation();
        const navigate = useNavigate()
      useEffect(()=>{
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('token');
        const activateAccount = async function(){
                await axios.get(`${SERVER_URL}/activateAccount?token=${token}`);;
                setLoading(false)
                navigate("/signin")
        }
        activateAccount()
          // eslint-disable-next-line react-hooks/exhaustive-deps
      },[navigate])
      
        return (
                <>
                {loading ? <div className='my-container'><h1>Loading...</h1></div>:<></>}
                </>
        );
      }
      
      export default Activation;