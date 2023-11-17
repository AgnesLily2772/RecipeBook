import {React,useState} from 'react';
import '../Styles/Styles.css'
import { useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"

const Signup = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState({fullName:"",email:"",password:"",dietPreference:"",location:""})
  const handleInputs = (e) =>{
      setUser({...user,[e.target.name]:e.target.value});
}

const PostData = async (e) =>{
  e.preventDefault();
  try {
        const response = await axios.post("http://localhost:5000/api/signup", user)
    
        const data = response.data;
        if(response.status=== 422  || !data){
                toast.error(data.error,{
                        position: toast.POSITION.BOTTOM_RIGHT,
                        autoClose: 1000,
              })
            }else{
                toast.success("Signup Successful",{
                        position: toast.POSITION.BOTTOM_RIGHT,
                        autoClose: 1000,
                })
                setTimeout(()=>navigate("/signin"),2000)
            }
      } catch (error) {
        console.log(error)
      }
}
      
  return (
    <>
        <div className='my-container'>
        <form method="POST"  className='form-component'> 
        <h3 className='form-title'>Sign Up</h3>
            <input placeholder="Enter Full Name"    type="text"    value={user.fullName}    onChange={handleInputs}    name="fullName"/>
            <input onChange={handleInputs}  placeholder="Enter Mail" type="text" value={user.email} name="email"/>
            <input onChange={handleInputs}  placeholder="Enter Password" type="password" value={user.password} name="password"/>
            <div className='row' >
            <input className='col ms-3 me-3' onChange={handleInputs}  placeholder="Enter Location" type="text" value={user.location} name="location"/>
            </div>
          <select className='registerdropdown' name='dietPreference' onChange={handleInputs} value={user.dietPreference || ""}>
            <option value="none"  hidden>Select your Diet Preference</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Non Vegetarian">Non Vegetarian</option>
            <option value="Eggetarian">Eggetarian</option>
          </select>
          <button className='my-button ' value="register" onClick={PostData}>SignUp</button>
        </form>
    </div>
<ToastContainer/>
    
    </>
  )
}

export default Signup