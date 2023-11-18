import {React,useState} from 'react';
import '../Styles/Styles.css'
import { useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import FileBase from 'react-file-base64';

const CreateRecipe = () => {
        const navigate = useNavigate();
        const [recipe, setRecipe] = useState({title:"",ingredients:[],instructions:"",imageUrl:"",cuisine:"",category:"",preparationTime:"",createdBy:"6557aa228bffcc2f832988c0"})
        const handleInputs = (e) =>{
                if (e.target.name === 'ingredients') {
                        const ingredientsArray = e.target.value.split(',')
                        setRecipe({ ...recipe, ingredients: ingredientsArray });
                      } else {
                        setRecipe({ ...recipe, [e.target.name]: e.target.value });
                      }
      }
      
      const PostData = async (e) =>{
        e.preventDefault();
        console.log(recipe)
        try {
              const response = await axios.post("http://localhost:5000/api/createRecipe", recipe)
              const data = response.data;
              if(response.status=== 422  || !data){
                      toast.error(data.error,{
                              position: toast.POSITION.BOTTOM_RIGHT,
                              autoClose: 1000,
                    })
                  }else{
                      toast.success("Recipe Posted",{
                              position: toast.POSITION.BOTTOM_RIGHT,
                              autoClose: 1000,
                      })
                      setTimeout(()=>navigate("/myRecipes"),2000)
                  }
            } catch (error) {
              console.log(error)
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
          <button className='my-button ' onClick={PostData}>Post Recipe</button>
        </form>
    </div>
<ToastContainer/>
    </>
  )
}

export default CreateRecipe