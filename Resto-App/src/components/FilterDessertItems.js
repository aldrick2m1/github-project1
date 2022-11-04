import React from 'react'
import {RiCloseCircleLine} from 'react-icons/ri'
import {TiEdit} from 'react-icons/ti'
import {MdOutlineAddShoppingCart} from 'react-icons/md'
import "../App.css"

const FilterDessertItems = ({dispatch, state}) => {
  const itemListLength = state.items.filter((item)=> item.category === "Dessert").length
  return itemListLength === 0 ? "No Items Available" : state.items.filter((item)=> item.category === "Dessert").map((item, index, id)=>(
    <>
    <div className='item-container' key={index}>
      <div  className='icons-container' >
      <h5>{item.category}</h5>
      <TiEdit className='icons' onClick={()=>{
          dispatch({type: "EDIT_ITEM", payload: {id: item.id}})
          dispatch({type: "TOGGLE_EDIT_FORM", payload: {editForm: state.editForm}})
          dispatch({type: 'SHOW-HIDE-ITEM-FORM-SHOW',payload: {addItemForm: state.addItemForm}})
        }}/>
        <RiCloseCircleLine className='icons' onClick={()=>{ 
              dispatch({type:'DELETE_ITEM_CART', payload: {id: item.id}})
              dispatch({type:'DELETE_ITEM', payload: {id: item.id}})}}/>
      </div>
        <h2>{item.item}</h2>
        <img className='item-img' src={item.image} alt="item-img"></img>
        <div className='item-below'>
        <h3>Php {item.price}</h3> 
        <MdOutlineAddShoppingCart className='icons-add' onClick={()=>{ 
          dispatch({type:'ADDTO_CART', payload: {
            id: item.id,
            item: item.item,
            image: item.image,
            price: item.price,
            description: item.description,
            category: item.category,
            edit: item.edit
            }})}}/>
         </div>
         <p>{item.description}</p> 
    </div>
</>
))}

export default FilterDessertItems