import React,{useEffect,useState} from 'react'
import axios from "axios"
import pastaImg from "../Imgs/pasta.jpg"
import { FaClipboardList } from "react-icons/fa";
import {useParams} from "react-router-dom"
const ViewRecipe = () => {
        const [recipe,setRecipe] = useState({})
        const [comments,setComments] = useState([])
        const [newComment,setNewComment] = useState({text:""})
        const params = useParams()
        const callRecipes = async() => {
                const recipeResponse =await axios.get(`http://localhost:5000/api/getRecipe/${params.id}`,{withCredentials:true})
                setRecipe(recipeResponse.data)
                const commentResponse =await axios.get(`http://localhost:5000/api/getComment/${params.id}`,{withCredentials:true})
                setComments(commentResponse.data)
        }
        useEffect(()=>{
                callRecipes()
            },[])
            const handleComment = async() => {
                const response = await axios.post(`http://localhost:5000/api/postComment/${params.id}`,newComment,{withCredentials:true})
                setComments((prevComments )=>[...prevComments,newComment])
                setNewComment("")
            }
  return (
    <>
    <div className='my-container' style={{border:"2px solid red"}}>
        <div className='shadow'  style={{border:"2px solid blue"}}>
        <h1 className='text-center'>{recipe.title}</h1>
        <div className='d-flex flex-row flex-sm-col gap-3'>
        <img className='w-50' src={pastaImg.toString()} alt={`${recipe.title} Img`}/>
      <div className='w-50'>
                <FaClipboardList size={30}/> Ingredients
                {recipe.ingredients && recipe.ingredients.map((instruction,idx) => (
                        <li>{instruction}</li>
                ))}                                        
                <FaClipboardList size={30}/> Instructions
                {recipe.instructions && recipe.instructions.split(",").map((instruction,idx) => (
                        <li>{instruction}</li>
                ))}
                <FaClipboardList size={30}/> Preparation time
                <li>Approximately {recipe.preparationTime}mins</li>
                <FaClipboardList size={30}/> Cuisine & Category
                <li>{recipe.cuisine} & {recipe.category}</li>
        </div>
        <div className='w-50'>
                <input type='text' placeholder='Type your comment' value={newComment.text} onChange={(e)=>setNewComment({...newComment,text:e.target.value})}/>
                <button className='btn btn-primary' onClick={handleComment}>Post</button>
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