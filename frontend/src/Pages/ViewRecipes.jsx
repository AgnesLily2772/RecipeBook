import React,{useEffect,useState} from 'react'
import axios from 'axios'
import pastaImg from "../Imgs/pasta.jpg"
import ViewRecipe from './ViewRecipe'
const ViewRecipes = ({searchQuery,filter,search,setSearch}) => {
        console.log(filter)
        const [allRecipes,setAllRecipes] = useState([])
        const [isModalOpen, setIsModalOpen] = React.useState(false);
        const filteredRecipes = allRecipes.filter((recipe) => recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) );
        const filteredData = (filter.length === 0)
                ? filteredRecipes
                : filteredRecipes.filter((item) => {
                    const arr = filter.map(filterItem => filterItem.split(",").map(Number));
                    return arr.some(([minTime, maxTime]) => item.preparationTime >= minTime && item.preparationTime <= maxTime
                    );
                });
        const callAllRecipes = async () =>{
                try{
                  const response =await axios.get('http://localhost:5000/api/getAllUsersRecipes',{withCredentials:true});
                  const data =  response.data;
                  setAllRecipes(data);
                  if(!response.status===200){
                    const error = new Error (response.error);
                    throw error;
                  }
                }catch(err){
                  console.log(err);
                }
              }

            useEffect(() => {
                callAllRecipes();
            }, [])
  return (
<div className='my-boundary border border-primary rounded-3'>
            <div className='recipe-gallery recipe-view overflow-hidden'>
          {filteredData.map((recipe, idx) => (
            <div className='recipe-card' key={idx}>
              <h5 className='recipe-title'>{recipe.title}</h5>
              <div className='d-flex'>
                <img className='recipe-img mb-2' src={pastaImg.toString()} alt={`${recipe.title} Img`} />
              </div>
              <div className='recipe-actions'>
              <button className='btn btn-success'  onClick={() => setIsModalOpen(true)}>View</button>
                <ViewRecipe show={isModalOpen} onHide={() => setIsModalOpen(false)} recipe={recipe}/>
                <button className='btn btn-warning btn-lg'>Like</button>
              </div>
            </div>
          ))
        }
            </div>
    </div>
  )
}

export default ViewRecipes