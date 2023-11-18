import React from 'react'
import Header from './Header.jsx'
import ViewRecipes from '../Pages/ViewRecipes.jsx'
import Sidebar from './Sidebar.jsx'

const Home = () => {
  return (
    <>
                <div className="container-fluid mt-5 d-flex flex-column flex-sm-row gap-3">
                <Sidebar/>
                        <div className="d-flex flex-column flex-grow-sm-0 flex-grow-1 gap-4">
                                <Header/>
                                <ViewRecipes/>
                        </div>
                </div>
    </>
  )
}

export default Home