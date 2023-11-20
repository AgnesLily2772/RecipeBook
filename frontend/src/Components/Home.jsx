import React,{useContext, useState} from 'react'
import Header from './Header.jsx'
import {BiSolidCopy} from "react-icons/bi"
import ViewRecipes from '../Pages/ViewRecipes.jsx'
import Sidebar from './Sidebar.jsx'
import { AuthContext } from '../Context/AuthContext.js'
import Logo from "../Design/RecipeBook_Logo.png"
import { useNavigate } from 'react-router-dom'

const Home = () => {
        const [allRecipes,setAllRecipes] = useState([])
        const [copyEmail,setEmailCopy] = useState("")
        const [copyPass,setPassCopy] = useState("")
        const [search,setSearch] = useState([]);
        const {userState} = useContext(AuthContext)
        const navigate = useNavigate()

        const filterData = e => {
                const value = e.target.value.toLowerCase();
                const filteredData = search.filter(
                  item => (`${item.title}`.toLowerCase().includes(value))
                )
                setAllRecipes(filteredData);
              }

        const filterCategory = e => {
                const value = e.target.value;
                const filteredCategory = search.filter(
                  item => (`${item.category}`.includes(value))
                )
                setAllRecipes(filteredCategory);
              }
        const filterCuisine = e => {
                const value = e.target.value;
                const filteredCuisine = search.filter(
                  item => (`${item.cuisine}`.includes(value))
                )
                setAllRecipes(filteredCuisine);
              }
              const filterNoIngredients= e => {
                const value = e.target.value.split(",").map(Number);
                const min=value[0], max = value[1]
                const filteredNoIngredients = search.filter(
                  item => (item.ingredients.length>min && item.ingredients.length<=max)
                )
                setAllRecipes(filteredNoIngredients);
              }
              const filterPrepTime= e => {
                const value = e.target.value.split(",").map(Number);
                const min=value[0], max = value[1]
                const filteredNoIngredients = search.filter(
                  item => (item.preparationTime>min && item.preparationTime<=max)
                )
                setAllRecipes(filteredNoIngredients);
              }
              
  return (
    <>
        {userState ? 
                        <div className="container-fluid mt-5 d-flex flex-column flex-sm-row gap-3">
                        <Sidebar  filterCuisine={filterCuisine} filterCategory={filterCategory} filterNoIngredients={filterNoIngredients} filterPrepTime={filterPrepTime}/>
                                <div className="d-flex flex-column flex-grow-sm-0 flex-grow-1 gap-4">
                                        <Header filterData={filterData}/>
                                        <ViewRecipes allRecipes={allRecipes} setAllRecipes={setAllRecipes} search={search} setSearch={setSearch}/>
                                </div>
                        </div>
                        :<>
                                <div className='my-container my-home'>
                                        <h1>Welcome to the world of recipes</h1>
                                        <div className='d-flex flex-row align-items-center gap-3 mt-5'>
                                                <img src={Logo} className='my-logo' alt='RecipeBookLogo'/>
                                                <div className='text-center'>
                                                <h1>The RecipeBook</h1>
                                                <p>You can either SignUp or SignIn</p>
                                                <button type="button" className="btn btn-secondary me-2" onClick={()=>navigate("/signup")}>SignUp</button>
                                                <button type="button" className="btn btn-secondary ms-2" onClick={()=>navigate("/signin")}>SignIn</button>
                                                </div>
                                        </div>
                                        <div className='mt-5 d-flex flex-column align-items-center'>
                                                <h4>If you're a reviewer of my project,Click here for credentials</h4>
                                                <button className='btn btn-info btn-lg' style={{ color: "navy", fontWeight: "bold", padding: "10px",backgroundColor:"springgreen", width:"200px"}}  data-bs-toggle="modal" data-bs-target="#staticBackdrop">View</button>
                                                <div className="modal fade" id="staticBackdrop"data-bs-backdrop="static" data-bs-keyboard="false"  tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                                        <div className="modal-dialog modal-dialog-centered">
                                                        <div className="modal-content">
                                                        <div className="modal-header">
                                                                <h5 className="modal-title" id="staticBackdropLabel">Demo Credentials</h5>
                                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>{setEmailCopy("");setPassCopy("")}}></button>
                                                        </div>
                                                        <div className="modal-body">
                                                                <div className='credential'>
                                                                        <p>Email: agneslily2727@gmail.com</p><span className='btn btn-success' onClick={()=>{ navigator.clipboard.writeText("agneslily2772@gmail.com");setPassCopy("");setEmailCopy("Copied")}}>{copyEmail} <BiSolidCopy type='button'/></span>
                                                                </div>
                                                                <div className='credential'>
                                                                <p>Password: 12345678</p><span className='btn btn-success' onClick={()=>{navigator.clipboard.writeText(12345678);setEmailCopy("");setPassCopy("Copied")}}>{copyPass} <BiSolidCopy type='button'/></span>
                                                                </div>
                                                        </div>
                                                        </div>
                                                        </div>
                                                        </div>
                                        </div>
                                </div>
                        </>
                        }
    </>
  )
}

export default Home