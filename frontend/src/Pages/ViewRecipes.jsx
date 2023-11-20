import React,{useEffect,useCallback} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SERVER_URL } from '../Utils/globals';
const ViewRecipes = ({search,setSearch,allRecipes,setAllRecipes}) => {
        const navigate = useNavigate()
 
        const callAllRecipes = useCallback(async () => {
                try {
                  const response = await axios.get(`${SERVER_URL}/getAllUsersRecipes`, { withCredentials: true });
                  if (response.status === 200) {
                        const data = response.data;
                        setAllRecipes(data);
                        setSearch(data);
                  }
                } catch (error) {
                  const errorMessage = error.response ? error.response.data.message : "An error occurred";
                  toast.error(errorMessage, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000 });
                }
              }, [setSearch,setAllRecipes]);
            
              useEffect(() => {
                callAllRecipes();
              }, [callAllRecipes]);

            const display = allRecipes && allRecipes.length > 0 ? (
                allRecipes.map((recipe, idx) => (
                    <div className='recipe-card' key={idx}>
                        <h5 className='recipe-title'>{recipe.title}</h5>
                        <div className='d-flex'>
                            <img className='recipe-img mb-2' src={recipe.imageUrl} alt={`${recipe.title} Img`} />
                        </div>
                        <div className='recipe-actions'>
                            <button className='btn btn-success' onClick={() => navigate(`/getRecipe/${recipe._id}`)}>View</button>
                            <button className='btn btn-warning btn-sm'>Like</button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No recipes found</p>
            );
  return (
<div className='my-boundary border border-primary rounded-3'>
            <div className='recipe-gallery recipe-view overflow-hidden'>
          {display}
            </div>
            <ToastContainer/>
    </div>
  )
}

export default ViewRecipes