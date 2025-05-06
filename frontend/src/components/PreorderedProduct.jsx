import React, { useState, useEffect } from "react";
import "./styles/PreorderedProduct.css"
import { IoTrashBinSharp } from "react-icons/io5";

const PreorderedProduct = (props) => {
    return (
        <div style={{display: "flex"}}>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "30px"}}>
                <div style={{width: "20%", display: "flex", justifyContent: "center"}}>
                    <img className="image-in-basket" src={props.image} alt="product-image"/>
                </div>
                <div className="pre-ordered-product">
                    <div style={{display: "flex"}}>
                        <p className="product-name-in-basket">Назва: </p>
                        <p className="product-name-value-in-basket"> {props.name}</p>
                    </div>
                    <p className="count-title">Кількість: {props.count}</p>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <strong className="price-basket">Ціна: {props.price} $</strong>
                        <IoTrashBinSharp className="delete-product-from-basket" onClick={props.deleteProductFromBasket}/>
                    </div>
                </div>
            </div>
            <div style={{display: "flex", alignItems: "center"}}>
                <p className='add-count-product' onClick={props.addCount}>+</p>
            </div>
            <div style={{display: "flex", alignItems: "center"}}>
                <p className='sub-count-product' onClick={() => {
                    if (props.count > 1)
                        props.subCount()
                    else
                        props.deleteProductFromBasket()
                }}>-</p>
            </div>
        </div>
    )
}

export default PreorderedProduct;