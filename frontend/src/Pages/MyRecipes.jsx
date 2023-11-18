import axios from 'axios'
import React, { useEffect, useState } from 'react'
import pastaImg from "../Imgs/pasta.jpg"
import {useNavigate} from "react-router-dom"
import { FaClipboardList } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyRecipes = () => {
        const [myRecipes,setMyRecipes] = useState([])
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
                        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div class="modal-dialog modal-dialog modal-lg">
                                <div class="modal-content">
                                <div class="modal-header">
                                        <h5 class="modal-title" id="staticBackdropLabel">{recipe.title}</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                <div className='row'>
                                <img className='col recipe-img mb-2' src={pastaImg.toString()} alt={`${recipe.title} Img`}/>
                                <div className='col w-50'>
                                <FaClipboardList size={30}/> Ingredients
                                        {recipe.ingredients.map((instruction,idx) => (
                                                <li>{instruction}</li>
                                        ))}                                        
                                        <FaClipboardList size={30}/> Instructions
                                        {recipe.instructions.split(",").map((instruction,idx) => (
                                                <li>{instruction}</li>
                                        ))}
                                        <FaClipboardList size={30}/> Preparation time
                                        <li>Approximately {recipe.preparationTime}mins</li>
                                        <FaClipboardList size={30}/> Cuisine & Category
                                        <li>{recipe.cuisine} & {recipe.category}</li>
                                </div>
                                </div>
                                </div>
                                <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                                </div>
                                </div>
                                </div>
                                <button className='btn btn-success'  data-bs-toggle="modal" data-bs-target="#staticBackdrop">View</button>
                                <button className='btn btn-warning' onClick={() => navigate(`/updateRecipe/${recipe._id}`)}>Update</button>
                                <button className='btn btn-danger' onClick={() => handleDelete(recipe._id)}>Delete</button>
                        </div>
                        </div>
                )): <>Nothing</>}
                </div>
        </div>
        <ToastContainer/>

    </>
  )
}

export default MyRecipes