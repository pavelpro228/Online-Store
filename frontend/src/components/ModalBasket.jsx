import React, { useEffect, useMemo } from 'react'
import './styles/Basket.css'
import PreorderedProduct from './PreorderedProduct'
import { MdClose } from 'react-icons/md'

const Basket = (props) => {
  const totalPrice = useMemo(() => {
    return props.productsInBasket.reduce((sum, p) => sum + p.product.price, 0)
  }, [props.productsInBasket])

  const closeModal = () => {
    props.setIsOpenedModal((isOpenedModal) => !isOpenedModal)
  }

  const getProducts = async () => {
    const response = await fetch('/api/get-products-in-basket', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ email: localStorage.getItem('email') }),
    })
    const data = await response.json()
    props.setProductsInBasket(data)
  }

  useEffect(() => {
    getProducts()
  }, [])

  const deleteProductFromBasket = async (id) => {
    try {
      const response = await fetch('/api/delete-products-from-basket', {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ _id: id }),
      })
      const data = await response.json()
      alert(data.message)
      props.setProductsInBasket(prev => prev.filter(p => p._id !== id))
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="modal-overlay">
      <div>
        <div className="modal-basket">
          <div className="basket">
            <div style={{ display: 'flex', marginBottom: '40px' }}>
              <p className="basket-title">Basket</p>
              <MdClose className="btn-close" onClick={closeModal} />
            </div>
            {props.productsInBasket.length == 0 ? (
              <p className="warning">You don't have any product!</p>
            ) : (
              props.productsInBasket.map((item, index) => (
                <PreorderedProduct
                  key={index}
                  name={item.product.name}
                  price={item.product.price}
                  image={item.product.image}
                  deleteProductFromBasket={() =>
                    deleteProductFromBasket(item._id)
                  }
                />
              ))
            )}
            {props.productsInBasket.length > 0 && (
              <div style={{ marginTop: '30px' }}>
                <strong>Total price: {totalPrice} $</strong>
                <div style={{ textAlign: 'center' }}>
                  <button className="order-product">Order a products</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Basket
