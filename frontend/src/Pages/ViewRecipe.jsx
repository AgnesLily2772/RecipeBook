import React from 'react'
import pastaImg from "../Imgs/pasta.jpg"
import { FaClipboardList } from "react-icons/fa";
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button"

const ViewRecipe = (props) => {
  return (
    <>
       <Modal   {...props}  size="lg"  aria-labelledby="contained-modal-title-vcenter"  centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{props.recipe.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className='row'>
      <img className='col recipe-img mb-2' src={pastaImg.toString()} alt={`${props.recipe.title} Img`}/>
      <div className='col w-50'>
                <FaClipboardList size={30}/> Ingredients
                {props.recipe.ingredients.map((instruction,idx) => (
                        <li>{instruction}</li>
                ))}                                        
                <FaClipboardList size={30}/> Instructions
                {props.recipe.instructions.split(",").map((instruction,idx) => (
                        <li>{instruction}</li>
                ))}
                <FaClipboardList size={30}/> Preparation time
                <li>Approximately {props.recipe.preparationTime}mins</li>
                <FaClipboardList size={30}/> Cuisine & Category
                <li>{props.recipe.cuisine} & {props.recipe.category}</li>
        </div>
      </Modal.Body>
      <Modal.Footer><Button onClick={props.onHide}>Close</Button></Modal.Footer>
    </Modal>
    </>
  )
}

export default ViewRecipe