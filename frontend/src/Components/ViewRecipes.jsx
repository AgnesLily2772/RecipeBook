import React,{useEffect,useState} from 'react'
import axios from 'axios'
import pastaImg from "../Imgs/pasta.jpg"

const ViewRecipes = () => {
        const [allRecipes,setAllRecipes] = useState([])
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
//         <div class="overflow-hidden">
//         <div class="bg-light border border-primary rounded-3 p-3">
//         <div className='recipe'>
//                 <div className='recipe-gallery'>
//                 {allRecipes ?  allRecipes.map((recipe,idx)=>(
//                         <div className='recipe-card' key={idx}>
//                         <h5 className='recipe-title'>{recipe.title}</h5>
//                         <div className='d-flex'>
//                         <img className='recipe-img mb-2' src={pastaImg.toString()} alt={`${recipe.title} Img`}/>
//                         {/* <div className='recipe-desc'>
//                                 <p>Cusine: {recipe.cuisine}</p>
//                                 <p>Category: {recipe.category}</p>
//                                 <p>From: {recipe.createdBy}</p>
//                         </div> */}
//                         </div>
//                         <div className='recipe-actions'>
//                                 <button className='btn btn-success'>View</button>
//                                 <button className='btn btn-warning'>Like</button>
//                         </div>
//                         </div>
//                 )): <>Nothing</>}
//                 </div>
//         </div>
//         </div>
//     </div>
<div className='my-boundary'>
            <div className='recipe-gallery'>
            {allRecipes ?  allRecipes.map((recipe,idx)=>(
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
                            <button className='btn btn-success btn-lg'>View</button>
                            <button className='btn btn-warning btn-lg'>Like</button>
                    </div>
                    </div>
            )): <>Nothing</>}
            </div>
    </div>
  )
}

export default ViewRecipes