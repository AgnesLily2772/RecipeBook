import React from 'react'

const Sidebar = () => {
        const filterOptions = {
                "Preparation Time":["0 - 20 mins", "20 - 40 mins","40 - 60 mins"],
                "Number Of Ingredients":["0 to 5","5 to 10",["10 to 15"]],
                "Cuisine":["TamilNadu","Andhra","Kerala"],
                "Category":["Breakfast","Lunch","Dinner","Desserts"]
        }
  return (
        // <div className="col-sm-2 flex-grow-sm-1 flex-shrink-1 flex-grow-0 sticky-top pb-sm-0 mt-5 pt-3">
        <div className="col-sm-2 flex-grow-sm-1 flex-shrink-1 flex-grow-0 sticky-top pb-sm-0 mt-5">

<div className="bg-light  border border-primary rounded-3 p-1 h-100 nav nav-pills flex-sm-column flex-row justify-content-between">
                <div>
                        <a href="#submenu1"  data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                            <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Preparation Time</span> </a>
                        <ul className="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                                {filterOptions["Preparation Time"].map((filter,idx) =>(
                                        <div className="form-check w-100" key={idx}>
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                        <label className="form-check-label" htmlFor="flexCheckDefault"> {filter}</label>
                                        </div>
                                ) )}
                        </ul>
                    </div>
                    <div>
                        <a href="#submenu2" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                            <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Number Of Ingredients</span> </a>
                        <ul className="collapse show nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                                {filterOptions["Number Of Ingredients"].map((filter,idx) =>(
                                        <div className="form-check w-100" key={idx}>
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                        <label className="form-check-label" htmlFor="flexCheckDefault"> {filter}</label>
                                        </div>
                                ) )}
                        </ul>
                    </div>
                    <div>
                        <a href="#submenu3" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                            <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Cuisine</span> </a>
                        <ul className="collapse show nav flex-column ms-1" id="submenu3" data-bs-parent="#menu">
                                {filterOptions["Cuisine"].map((filter,idx) =>(
                                        <div className="form-check w-100" key={idx}>
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                        <label className="form-check-label" htmlFor="flexCheckDefault"> {filter}</label>
                                        </div>
                                ) )}
                        </ul>
                    </div>
                    <div>
                        <a href="#submenu4" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                            <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Category</span> </a>
                        <ul className="collapse show nav flex-column ms-1" id="submenu4" data-bs-parent="#menu">
                                {filterOptions["Category"].map((filter,idx) =>(
                                        <div className="form-check w-100" key={idx}>
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                        <label className="form-check-label" htmlFor="flexCheckDefault"> {filter}</label>
                                        </div>
                                ) )}
                        </ul>
                    </div>
        </div>
    </div>

  )
}

export default Sidebar