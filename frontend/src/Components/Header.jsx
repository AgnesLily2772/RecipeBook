import React from 'react'
import {useNavigate} from "react-router-dom"
const Header = () => {
        const navigate = useNavigate()
        const handleCreateRecipe = ()=> {
                navigate("/createRecipe")
        }
  return (
         <div className="mt-5">
             <div className="d-flex flex-row">
                 <input className='w-75 me-3' placeholder='Type Something...'/>
                <button className='w-25 btn btn-primary' onClick={handleCreateRecipe}>Create Recipe</button>
             </div>
     </div>
  )
}

export default Header