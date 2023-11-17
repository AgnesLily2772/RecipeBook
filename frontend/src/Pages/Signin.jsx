import {React,useState,useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import '../Styles/Styles.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { AuthContext } from '../Context/AuthContext';

const Signin = () => {
        const token = Cookies.get('jwtoken');

        const {login,dispatch} = useContext(AuthContext)
        const navigate = useNavigate();
  const [user,setUser] = useState({email:"",password:""})

  const handleInputs = (e) =>{
      setUser({...user,[e.target.name]:e.target.value});
}
 const handleSignIn =async (e)=>{
    e.preventDefault();

    const response =await  axios.post(`http://localhost:5000/api/signin`,user,{withCredentials:true});
    const data = response.data
    if(response.status === 400 || !data){
        toast.error(data.error,{
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000,
      })
    }else{
        toast.success("SignIn Successful",{
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000,
        })
}
        dispatch(login(token));
      setTimeout(()=>navigate("/"),2000)
    
 }
  return (
   <>
   <div className='my-container'>
    <form method='POST' className='form-component'>
    <h3 className='form-title'>Signin</h3>
        <input  onChange={handleInputs}  placeholder="Enter Mail"  type="email"  value={user.email}  name="email"  required/> 
        <input onChange={handleInputs} placeholder="Enter Password" type="password" value={user.password} name="password" required/>
            <button className='my-button'  onClick={handleSignIn}>Signin</button>
    </form>
    </div>
    <ToastContainer/>
   </>
  )
}

export default Signin