import React from 'react';
import { FaBasketShopping } from "react-icons/fa6";
import "./styles/Products.css"

const Card = (props) => {
  const productInfo = {
    email: localStorage.getItem('email'),
    product: {
      name: props.name,
      price: props.price,
      image: props.image
    }
  }

  const addProduct = () => {
    props.addProductToBasket(productInfo);
  }
  return (
    <div className='card'>
      <div style={{height: "100%"}}>
        <div style={{height: "65%", display: "flex", justifyContent: "center" , alignItems: "center"}}>
          <img className='image' src={props.image} onClick={() => window.location.href = `/product/${props.name}`}/>
        </div>
        <p className='product-name' onClick={() => window.location.href = `/product/${props.name}`}>{props.name}</p>
        <div className='price-and-backet'>
          <strong className='price'>Price: {props.price} $</strong>
          <FaBasketShopping className='backet-icon' onClick={() => {
            addProduct();
            props.addToTotal(productInfo.product.price);          
          }}/>
        </div>
      </div>
    </div>
  );
}

export default Card;