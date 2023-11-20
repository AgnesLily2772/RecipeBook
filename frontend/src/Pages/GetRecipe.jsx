import React,{useState,useEffect,useCallback} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaClipboardList } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SERVER_URL } from '../Utils/globals';
import { IoIosTime } from "react-icons/io";
import { MdNumbers } from "react-icons/md";
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
    <div className='my-container'>
    <div className='view-recipe '>
        <h1 className='text-center recipe-title'>{recipe.title}</h1>
        <div className='view-recipe-box gap-3'>
        <img className='view-recipe-img' src={recipe.imageUrl} alt={`${recipe.title} Img`}/>
      <div className='view-recipe-content'>
                <FaClipboardList size={30} color='red'/>    Ingredients
                {recipe.ingredients && recipe.ingredients.map((instruction,idx) => (
                        <li key={idx}>{instruction}</li>
                ))}                                        
                <hr/>
                <MdNumbers size={30} color='green'/>    Instructions
                {recipe.instructions && recipe.instructions.split(",").map((instruction,idx) => (
                        <li key={idx}>{instruction}</li>
                ))}
                <hr/>
                <IoIosTime size={30} color='blue'/>    Preparation time
                <li>Approximately {recipe.preparationTime}mins</li>
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