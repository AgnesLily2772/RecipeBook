import axios from 'axios'
import React, { useEffect, useState } from 'react'
import pastaImg from "../Imgs/pasta.jpg"
import {useNavigate} from "react-router-dom"
import { FaClipboardList } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ViewRecipe from './ViewRecipe';

const MyRecipes = () => {
        const [myRecipes,setMyRecipes] = useState([])
        const [modalShow, setModalShow] = React.useState(false);
        const navigate = useNavigate()
        const handleDelete =async (id) =>{
                console.log(id)
                const response = await axios.delete(`http://localhost:5000/api/deleteRecipe/${id}`,{withCredentials:true});
                if(response.status !== 200){
                        toast.error(response.error,{
                                position: toast.POSITION.BOTTOM_RIGHT,
                                autoClose: 1000,
                      })
                }
                else{
                        toast.success("Recipe Deleted",{
                                position: toast.POSITION.BOTTOM_RIGHT,
                                autoClose: 1000,
                        })
                }
                setMyRecipes((myRecipes) => myRecipes.filter((myRecipe) => myRecipe.id !==id))
                navigate("/myRecipes")
        }
        const callMyRecipes = async () =>{
                try{
                  const response =await axios.get('http://localhost:5000/api/getUserRecipe',{withCredentials:true});
                  const data =  response.data;
                  setMyRecipes(data);
                  if(!response.status===200){
                    const error = new Error (response.error);
                    throw error;
                  }
                }catch(err){
                  console.log(err);
                }
              }
            useEffect(() => {
              callMyRecipes();
            }, [])
  return (
    <>
        <div className='recipe'>
                <div className='recipe-gallery'>
                {myRecipes ?  myRecipes.map((recipe,idx)=>(
                        <div className='recipe-card' key={idx}>
                        <h5 className='recipe-title'>{recipe.title}</h5>
                        <div className='d-flex'>
                        <img className='recipe-img mb-2' src={pastaImg.toString()} alt={`${recipe.title} Img`}/>
                        </div>
                        <div className='recipe-actions'>
                                <button className='btn btn-success'  onClick={() => setModalShow(true)}>View</button>
                                <ViewRecipe show={modalShow} onHide={() => setModalShow(false)} recipe={recipe}/>
                                <button className='btn btn-warning' onClick={() => navigate(`/updateRecipe/${recipe._id}`)}>Update</button>
                                <button className='btn btn-danger' onClick={() => handleDelete(recipe._id)}>Delete</button>
                        </div>
                        </div>
                )): <>Nothing</>}
                </div>
        </div>

    </>
  )
}

export default MyRecipes