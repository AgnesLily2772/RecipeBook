import {React,useState,useEffect} from 'react'
import '../Styles/Styles.css'
import axios from 'axios';

const Profile = () => {
  const [userData,setUserData] = useState({});
  const callProfilePage = async () =>{
    try{
      const response =await axios.get('http://localhost:5000/api/getUserData',{withCredentials:true});
      const data =  response.data;
      setUserData(data);
      if(!response.status===200){
        const error = new Error (response.error);
        throw error;
      }
    }catch(err){
      console.log(err);
    }
  }
useEffect(() => {
  callProfilePage();
}, [])
  return (
   <>
   <div className="my-container">
        <div className='profile-details'>
        <h3 className='profile-title'>Profile</h3>
            <p className='profile-item'>Name : {userData.fullName}</p>
            <p className='profile-item'>Email : {userData.email}</p>
            <p className='profile-item'>Diet Preference : {userData.dietPreference}</p>
            <p className='profile-item'>Location : {userData.location}</p>
        </div>
   </div>
   </>
  )
}

export default Profile;