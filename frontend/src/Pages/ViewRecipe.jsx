import React,{useCallback, useEffect,useState} from 'react'
import axios from "axios"
import { FaClipboardList, } from "react-icons/fa";
import {useParams} from "react-router-dom"
import { SERVER_URL } from '../Utils/globals';
import { IoIosTime } from "react-icons/io";
import { MdNumbers } from "react-icons/md";

const ViewRecipe = () => {
        const [recipe,setRecipe] = useState({})
        const [comments,setComments] = useState([])
        const [newComment,setNewComment] = useState({text:""})
        const params = useParams()
        const callRecipes = useCallback(async() => {
                const recipeResponse =await axios.get(`${SERVER_URL}/getRecipe/${params.id}`,{withCredentials:true})
                setRecipe(recipeResponse.data)
                const commentResponse =await axios.get(`${SERVER_URL}/getComment/${params.id}`,{withCredentials:true})
                setComments(commentResponse.data)
        },[params.id])
        useEffect(()=>{
                callRecipes()
            },[callRecipes])
            const handleComment = async() => {
                 await axios.post(`${SERVER_URL}/postComment/${params.id}`,newComment,{withCredentials:true})
                setComments((prevComments )=>[...prevComments,newComment])
                setNewComment("")
            }
  return (
    <>
    <div className='my-container'>
        <div className='view-recipe'>
        <h1 className='text-center recipe-title'>{recipe.title}</h1>
        <div className='d-flex flex-row flex-sm-col gap-3'>
        <img className='view-recipe-img' src={recipe.imageUrl} alt={`${recipe.title} Img`}/>
      <div className='view-recipe-content'>
                <FaClipboardList size={30} color='red'/>    Ingredients
                {recipe.ingredients && recipe.ingredients.map((instruction,idx) => (
                        <li>{instruction}</li>
                ))}                                        
                <hr/>
                <MdNumbers size={30} color='green'/>    Instructions
                {recipe.instructions && recipe.instructions.split(",").map((instruction,idx) => (
                        <li>{instruction}</li>
                ))}
                <hr/>
                <IoIosTime size={30} color='blue'/>    Preparation time
                <li>Approximately {recipe.preparationTime}mins</li>
                <li>{recipe.cuisine} & {recipe.category}</li>
        </div>
        <div className=''>
                        <div className='d-flex'>
                        <input className='form-control' type='text' placeholder='Type your comment' value={newComment.text} onChange={(e)=>setNewComment({...newComment,text:e.target.value})}/>
                <button className='btn btn-primary' onClick={handleComment}>Post</button>
                        </div>
                <div className='recipe-comments'>
                        {comments.length>0 ? 
                        comments.map((comment,idx) => (
                                <div key={idx}>
                                        <li>{comment.text}</li>
                                </div>
                        ))
                        :<><p>Be the first one to comment</p></>}
                </div>
        </div>
        </div>
        </div>
    </div>
    </>
  )
}

export default ViewRecipe