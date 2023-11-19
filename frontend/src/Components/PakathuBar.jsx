import React from 'react'

const PakathuBar = ({filterCuisine,filterCategory,filterNoIngredients,filterPrepTime}) => {
        const PrepTimeFilterOptions = [[0,20], [20,40],[40,60]]
        const NoIngredientsFilterOptions = [[0,5], [5,10], [10,15]];
        const cuisineOptions = ["TamilNadu","Italian","Andhar","Kerala","International"]
        const categoryOptions = ["Breakfast","Lunch","Dinner","Desserts"]

  return (
        <div className="col-sm-2 flex-grow-sm-1 flex-shrink-1 flex-grow-0 sticky-top pb-sm-0  mt-5 ">
        <div className="border border-primary rounded-3 nav nav-pills flex-sm-column flex-row p-2">
                        <a href="#submenu1"  data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                            <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Preparation Time</span> </a>
                        <ul className="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                                 {PrepTimeFilterOptions.map((filter,idx) =>(
                                        <div className="form-check w-100" key={idx}>
                                        <input className="form-check-input" type="radio" name='prepTime' value={[filter[0],filter[1]]} onChange={filterPrepTime}/>
                                        <label className="form-radio-label" htmlFor="flexCheckDefault"> {`${filter[0]} - ${filter[1]} mins`}</label>
                                        </div>
                                ) )}
                        </ul>
                        <a href="#submenu1"  data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                            <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Preparation Time</span> </a>
                        <ul className="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                                 {NoIngredientsFilterOptions.map((filter,idx) =>(
                                        <div className="form-check w-100" key={idx}>
                                        <input className="form-check-input" type="radio" name='ingredients' value={[filter[0],filter[1]]} onChange={filterNoIngredients}/>
                                        <label className="form-radio-label" htmlFor="flexCheckDefault"> {`${filter[0]} - ${filter[1]} ingreditens`}</label>
                                        </div>
                                ) )}
                        </ul>
                        <a href="#submenu1"  data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                            <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Preparation Time</span> </a>
                        <ul className="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                                 {cuisineOptions.map((item,idx) =>(
                                        <div className="form-check w-100" key={idx}>
                                        <input className="form-check-input" type="radio" name='cusine' value={item} onInput={filterCuisine}/>
                                        <label className="form-radio-label" htmlFor="flexCheckDefault"> {item}</label>
                                        </div>
                                ) )}
                        </ul>
                        <a href="#submenu1"  data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                            <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Category</span> </a>
                        <ul className="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                                 {categoryOptions.map((item,idx) =>(
                                        <div className="form-check w-100" key={idx}>
                                        <input className="form-check-input" type="radio" name='category' value={item} onInput={filterCategory}/>
                                        <label className="form-radio-label" htmlFor="flexCheckDefault"> {item}</label>
                                        </div>
                                ) )}
                        </ul>
        </div>
    </div>

  )
}

export default PakathuBar