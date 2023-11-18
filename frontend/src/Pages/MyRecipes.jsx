import axios from 'axios'
import React, { useEffect, useState } from 'react'
import pastaImg from "../Imgs/pasta.jpg"
import {useNavigate} from "react-router-dom"
import { FaClipboardList } from "react-icons/fa";

const MyRecipes = () => {
        const [myRecipes,setMyRecipes] = useState([])
        const navigate = useNavigate()
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
                        {/* <div className='recipe-desc'>
                                <p>Cusine: {recipe.cuisine}</p>
                                <p>Category: {recipe.category}</p>
                                <p>From: {recipe.createdBy}</p>
                        </div> */}
                        </div>
                        <div className='recipe-actions'>
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop"> Launch</button>
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
                                        <span>
                                        <FaClipboardList size={30}/> {recipe.instructions}
                                </div>
                                </div>
                                </div>
                                <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary">Like</button>
                                </div>
                                </div>
                                </div>
                                </div>
                                <button className='btn btn-success'>View</button>
                                <button className='btn btn-warning'>Update</button>
                                <button className='btn btn-danger'>Delete</button>
                        </div>
                        </div>
                )): <>Nothing</>}
                </div>
        </div>
    </>
  )
}

export default MyRecipes