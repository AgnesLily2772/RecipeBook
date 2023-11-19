import React,{useState} from 'react'
import Header from './Header.jsx'
import ViewRecipes from '../Pages/ViewRecipes.jsx'
import NearRecipes from '../Pages/NearRecipes.jsx'
import Sidebar from './Sidebar.jsx'
import PakathuBar from "./PakathuBar.jsx"

const Home = () => {
        const [searchQuery, setSearchQuery] = useState('');
        const [allRecipes,setAllRecipes] = useState([])

        // const [filter,setFilter] = useState([])
        const [search,setSearch] = useState([]);

        const filterData = e => {
                const value = e.target.value.toLowerCase();
                console.log(value)
                const filteredData = search.filter(
                  item => (`${item.title}`.toLowerCase().includes(value))
                )
                console.log(filteredData)

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
                <div className="container-fluid mt-5 d-flex flex-column flex-sm-row gap-3">
                {/* <Sidebar filterTags={filterTags} setFilterTags={setFilterTags}/> */}
                <PakathuBar filterCuisine={filterCuisine} filterCategory={filterCategory} filterNoIngredients={filterNoIngredients} filterPrepTime={filterPrepTime}/>
                        <div className="d-flex flex-column flex-grow-sm-0 flex-grow-1 gap-4">
                                <Header filterData={filterData}/>
                                {/* <ViewRecipes searchQuery={searchQuery} filter={filter} search={search} setSearch={setSearch}/> */}
                                <NearRecipes allRecipes={allRecipes} setAllRecipes={setAllRecipes} search={search} setSearch={setSearch}/>
                        </div>
                </div>
    </>
  )
}

export default Home