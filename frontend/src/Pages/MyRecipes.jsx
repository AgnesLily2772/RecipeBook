import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SERVER_URL } from '../Utils/globals';
const MyRecipes = () => {
        const [myRecipes,setMyRecipes] = useState([])
        const navigate = useNavigate()
        const handleDelete =async (id) =>{
                try{
                const response = await axios.delete(`${SERVER_URL}/deleteRecipe/${id}`,{withCredentials:true});
                if(response.status === 200 ){
                        toast.success("Recipe Deleted",{ position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000})
                        setMyRecipes((myRecipes) => myRecipes.filter((myRecipe) => myRecipe.id !==id))
                        navigate("/myRecipes")                
                }
        } catch (error) {
                const errorMessage = error.response ? error.response.data.message : "An error occurred";
                toast.error(errorMessage, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000 })
        }
        }
        const callMyRecipes = async () =>{
                try{
                  const response =await axios.get(`${SERVER_URL}/getUserRecipe`,{withCredentials:true});
                  if(response.status === 200 ){
                        const data =  response.data;
                        setMyRecipes(data);
                }
        } catch (error) {
                const errorMessage = error.response ? error.response.data.message : "An error occurred";
                toast.error(errorMessage, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000 })
        }
}
            useEffect(() => {
              callMyRecipes();
            }, [])
  return (
    <>
{myRecipes.length > 0 ? (
  <div className='recipe'>
    <div className='recipe-gallery overflow-hidden'>
      {myRecipes.map((recipe, idx) => (
        <div className='recipe-card' key={idx}>
          <h5 className='recipe-title'>{recipe.title}</h5>
          <div className='d-flex'>
            <img className='recipe-img mb-2' src={recipe.imageUrl} alt={`${recipe.title} Img`} />
          </div>
          <div className='recipe-actions'>
            <button className='btn btn-success' onClick={() => navigate(`/viewRecipe/${recipe._id}`)}>View</button>
            <button className='btn btn-warning' onClick={() => navigate(`/updateRecipe/${recipe._id}`)}>Update</button>
            <button className='btn btn-danger' onClick={() => handleDelete(recipe._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  </div>
) : (
  <div className='my-container'>
    <h1>No recipes yet. But you can start creating.</h1>
    <button className='btn btn-primary btn-lg' onClick={() => navigate("/createRecipe")}>Create Recipe</button>
  </div>
)}

<ToastContainer/>
    </>
  )
}

export default MyRecipes