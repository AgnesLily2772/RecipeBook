import {React,useState} from 'react';
import '../Styles/Styles.css'
import { useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import { SERVER_URL } from '../Utils/globals';

const Signup = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState({fullName:"",email:"",password:"",dietPreference:"",location:"",agreedToTerms:true})
  const handleInputs = (e) =>{
      setUser({...user,[e.target.name]:e.target.value});
}
const dataValidation = () => {
        for (let data in user) {
                if ( (data !== "agreedToTerms" && user[data].trim() === "") || (data === "agreedToTerms" && user[data] === false)) {
                  toast.error(`${data} is required`, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000 });
                  return false;
                }
              }
              return true;
      };
const PostData = async (e) => {
        e.preventDefault();
        if (!dataValidation()) return
        try {
          const response = await axios.post(`${SERVER_URL}/signup`, user);
          if (response.status === 200) {
                toast.success("Signup Successful", { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000 });
                setTimeout(() => navigate("/signin"), 2000);
          } 
        } catch (error) {
                const errorMessage = error.response ? error.response.data.message : "An error occurred";
                toast.error(errorMessage, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000 })
        }
      };
      
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
          <div className='d-flex flex-row gap-3'><input type='checkbox' className='form-check-input' defaultChecked={user.agreedToTerms} name='agreedToTerms'onChange={(e) =>setUser({...user,agreedToTerms: e.target.checked})}/><label>I accept the terms and conditions</label></div>
          <button className='my-button ' onClick={PostData}>SignUp</button>
        </form>
    </div>
<ToastContainer/>
    </>
  )
}

export default Signup