import React,{useState,useEffect,useCallback} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaClipboardList } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SERVER_URL } from '../Utils/globals';
const GetRecipe = () => {
        const [recipe,setRecipe] = useState({})
        const params = useParams()
        const callRecipes = useCallback(async () => {
                try {
                  const response = await axios.get(`${SERVER_URL}/getRecipe/${params.id}`, { withCredentials: true });
                  if (response.status === 200) {
                    const data = response.data;
                    setRecipe(data);
                  }
                } catch (error) {
                  const errorMessage = error.response ? error.response.data.message : "An error occurred";
                  toast.error(errorMessage, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000 });
                }
              }, [params.id]);
            
              useEffect(() => {
                callRecipes();
              }, [callRecipes]);
  return (
    <>
    <div className='my-container' style={{border:"2px solid red"}}>
        <div className='shadow'  style={{border:"2px solid blue"}}>
        <h1 className='text-center'>{recipe.title}</h1>
        <div className='d-flex flex-row flex-sm-col gap-3'>
        <img className='w-50' src={recipe.imageUrl} alt={`${recipe.title} Img`}/>
      <div className='w-50'>
                <FaClipboardList size={30}/> Ingredients
                {recipe.ingredients && recipe.ingredients.map((instruction,idx) => (
                        <li key={idx}>{instruction}</li>
                ))}                                        
                <FaClipboardList size={30}/> Instructions
                {recipe.instructions && recipe.instructions.split(",").map((instruction,idx) => (
                        <li key={idx}>{instruction}</li>
                ))}
                <FaClipboardList size={30}/> Preparation time
                <li>Approximately {recipe.preparationTime}mins</li>
                <FaClipboardList size={30}/> Cuisine & Category
                <li>{recipe.cuisine} & {recipe.category}</li>
        </div>
        </div>
        </div>
    </div>
    <ToastContainer/>
    </>
  )
}

export default GetRecipe