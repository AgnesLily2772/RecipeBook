import React,{useContext, useEffect, useState} from 'react'
import Header from './Header.jsx'
import ViewRecipes from '../Pages/ViewRecipes.jsx'
import Sidebar from './Sidebar.jsx'
import { AuthContext } from '../Context/AuthContext.js'
import Logo from "../Design/RecipeBook_Logo.png"
const Home = () => {
        const [allRecipes,setAllRecipes] = useState([])
        const [search,setSearch] = useState([]);
        const {userState} = useContext(AuthContext)

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
                                <div className='my-container'>
                                        <h1>Welcome to the world of recipes</h1>
                                        <div className='d-flex flex-row align-items-center gap-3'>
                                                <img src={Logo} className='w-25'/>
                                                <h1>The RecipeBook</h1>
                                        </div>
                                </div>
                        </>
                        }
    </>
  )
}

export default Home