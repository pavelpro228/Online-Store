import React from 'react'
import { FaBasketShopping } from "react-icons/fa6";

import Specs from './Specs';
import { addProductToBasket } from '../methods/addProductToBasket'
import './styles/AboutPC.css'

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
    <>
      <h1 style={{marginBottom: "80px"}}>{props.name}</h1>
      <div className='about-pc-content'>
        <div className='image-block'>
          <div style={{display: "flex", alignItems: "center", backgroundColor: "white", height: "450px", width: "450px", borderRadius: "15px",}}>
            <div style={{ display: "flex", justifyContent: "center"}}>
              <img style={{width: "80%"}} src={props.image} alt=""/>
            </div>
          </div>
        </div>
        <div className='specs-block'>
          <div style={{width: "450px"}}>
            <div style={{marginBottom: "20px"}}>
              <span className='product-option'>{props.description}</span>
            </div>
            <Specs specs={props.specs}/>
            <div className='price-block'>
              <div style={{display: "flex"}}>
                <strong className='product-option'>Price: {props.price} $</strong>
                <FaBasketShopping className='basket-icon' onClick={() => {
                  addProductToBasket(productInfo)
                  // props.addToTotal(productInfo.product.price);          
                }}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutPC