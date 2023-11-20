import {React,useState} from 'react';
import '../Styles/Styles.css'
import { useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import FileBase from 'react-file-base64';
import { SERVER_URL } from '../Utils/globals';

const CreateRecipe = () => {
        const navigate = useNavigate();
        const [recipe, setRecipe] = useState({title:"",ingredients:[],instructions:"",imageUrl:"",cuisine:"",category:"",preparationTime:""})
        const handleInputs = (e) =>{
                if (e.target.name === 'ingredients') {
                        const ingredientsArray = e.target.value.split(',')
                        setRecipe({ ...recipe, ingredients: ingredientsArray });
                      } else {
                        setRecipe({ ...recipe, [e.target.name]: e.target.value });
                      }
      }
      const dataValidation = () => {
        for (let property in recipe) {
          const value = recipe[property];
      
          if (Array.isArray(value)) {
            if (value.length === 0) {
              toast.error(`${property} must have at least one item`, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000 });
              return false;
            }
          } else if (typeof value === 'string') {
            if (value.trim() === "") {
              toast.error(`${property} is required`, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000 });
              return false;
            }
          }
        }
      
        return true;
      };
      const PostData = async (e) =>{
        e.preventDefault();
        if(!dataValidation())return
        try {
                const response = await axios.post(`${SERVER_URL}/createRecipe`, recipe,{withCredentials:true})
                if(response.status === 200 ){
                        toast.success("Recipe Posted",{ position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000})
                        setTimeout(()=>navigate("/myRecipes"),2000)
                }
        } catch (error) {
                const errorMessage = error.response ? error.response.data.message : "An error occurred";
                toast.error(errorMessage, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000 })
        }
      }
  return (
    <>
            <div className='my-container'>
        <form method="POST"  className='form-component'> 
        <h3 className='form-title'>Create Recipe</h3>
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
            <option value="SouthIndian">SouthIndian Cuisine</option>
            <option value="NorthIndian">NorthIndian Cuisine</option>
            <option value="International">International Cusine</option>
          </select> 
          <select className='col ms-3 me-3 registerdropdown' name='category' onChange={handleInputs} value={recipe.category || ""}>
            <option value="none"  hidden>Select Category</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
          </select> 
            </div>
            <FileBase  className="file-upload" name="imageUrl" type="file" multiple={false} onDone={({ base64 }) => setRecipe({ ...recipe, imageUrl: base64 })} />
          <button className='my-button ' onClick={PostData}>Post Recipe</button>
        </form>
    </div>
<ToastContainer/>
    </>
  )
}

export default CreateRecipe