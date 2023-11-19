import React,{useState} from 'react'
import {useNavigate} from "react-router-dom"
const Header = ({ filterData }) => {
        const navigate = useNavigate()
        const handleCreateRecipe = ()=> {
                navigate("/createRecipe")
        }
  return (
         <div className="mt-5">
             <div className="d-flex flex-row">
                 <input className='w-75 me-3' onChange={filterData} placeholder='Type Any Recipe Title...'/>
                <button className='w-25 btn btn-primary' onClick={handleCreateRecipe}>Create Recipe</button>
             </div>
     </div>
  )
}

export default Header