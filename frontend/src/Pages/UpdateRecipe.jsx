import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import FileBase from 'react-file-base64';

const UpdateRecipe = () => {
        const navigate = useNavigate()
        const params = useParams();
        const [recipe,setRecipe] = useState({})
        useEffect(()=>{
                axios.get(`http://localhost:5000/api/getRecipe/${params.id}`,{withCredentials:true})
                .then((data) => setRecipe(data.data))
            },[params.id])
            const handleInputs=(e)=>{
                setRecipe({...recipe,[e.target.name] : e.target.value})
            }
            const handleUpdate = (e)=>{
                e.preventDefault();
                axios.put(`http://localhost:5000/api/updateRecipe/${params.id}`,recipe,{withCredentials:true})
                .then((res) => setRecipe({title:""}))
                navigate('/myRecipes')
            }
  return (
        <div className='my-container'>
        <form method="POST"  className='form-component'> 
        <h3 className='form-title'>Update Recipe</h3>
            <input placeholder="Enter Title"    type="text"    value={recipe.title}    onChange={handleInputs}    name="title"/>
            <textarea placeholder="Enter comma separated ingredients" name="ingredients" onChange={handleInputs} value={recipe.ingredients}/>
            <textarea onChange={handleInputs}  placeholder="Enter instructions" value={recipe.instructions} name="instructions"/>
            <div className='row' >
            <select className='col ms-3 me-2 registerdropdown' name='preparationTime' onChange={handleInputs} value={recipe.preparationTime || ""}>
            <option value="none"  hidden>Prep Time</option>
            <option value="10">10 mins</option>
            <option value="20">20 mins</option>
            <option value="30">30 mins</option>
            <option value="40">40 mins</option>
            <option value="50">50 mins</option>
            <option value="60">60 mins</option>
          </select> 
            <select className='col ms-3 me-2 registerdropdown' name='cuisine' onChange={handleInputs} value={recipe.cuisine || ""}>
            <option value="none"  hidden>Select Cuisine</option>
            <option value="TamilNadu">TamilNadu Cuisine</option>
            <option value="Non Kerala">Kerala Cuisine</option>
            <option value="Andhra">Andhra Cusine</option>
          </select> 
          <select className='col ms-3 me-3 registerdropdown' name='category' onChange={handleInputs} value={recipe.category || ""}>
            <option value="none"  hidden>Select Category</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Desserts">Desserts</option>
          </select> 
            </div>
            <FileBase  className="file-upload" name="imageUrl" type="file" multiple={false} onDone={({ base64 }) => setRecipe({ ...recipe, imageUrl: base64 })} />
          <button className='my-button ' onClick={handleUpdate}>Post Recipe</button>
        </form>
    </div>
  )
}

export default UpdateRecipe