import React from 'react'
import { FaBasketShopping } from "react-icons/fa6";
<<<<<<< HEAD

import { addProductToBasket } from '../methods/addProductToBasket'

=======
import Specs from './Specs';
import { addProductToBasket } from '../methods/addProductToBasket'

>>>>>>> 690ef5f (fixed bugs and added comp specs)
const AboutPC = (props) => {
  const productInfo = {
    email: localStorage.getItem('email'),
    product: {
      name: props.name,
      price: props.price,
      image: props.image
    }
  }
  
  return (
    <div>
      <h1 style={{marginBottom: "80px"}}>{props.name}</h1>
      <div style={{display: "flex"}}>
        <div style={{width: "50%", display: "flex", justifyContent: "center"}}>
          <div style={{width: "50%", borderRadius: "15px", backgroundColor: "white", display: "flex", justifyContent: "center"}}>
            <img style={{width: "80%"}} src={props.image} alt=""/>
          </div>
        </div>
        <div style={{width: "50%", display: "flex", alignItems: "center"}}>
          <div>
            <div style={{marginBottom: "20px"}}>
              <span className='product-option'>{props.description}</span>
            </div>
<<<<<<< HEAD
            <div>
              <strong className='product-option'>Price: {props.price} $</strong>
            </div>
            <FaBasketShopping className='basket-icon' onClick={() => {
              addProductToBasket(productInfo)
              // props.addToTotal(productInfo.product.price);          
            }}/>
=======
            <Specs specs={props.specs}/>
            <div style={{display: "flex"}}>
              <strong className='product-option'>Price: {props.price} $</strong>
              <FaBasketShopping className='basket-icon' onClick={() => {
                addProductToBasket(productInfo)
                // props.addToTotal(productInfo.product.price);          
              }}/>
            </div>
>>>>>>> 690ef5f (fixed bugs and added comp specs)
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPC