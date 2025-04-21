import React, { useEffect, useState } from 'react'

import Input from './Input'
import AutoComplete from './AutoComplete'
import Card from './Card'
import ModalBasket from './ModalBasket'

import './styles/AutoComplete.css'

const Content = () => {
  const [products, setProducts] = useState([])
  const [productsInBasket, setProductsInBasket] = useState([])

  const [value, setValue] = useState('')
  const [isOpened, setIsOpened] = useState(true)
  const [isOpenedModalBasket, setIsOpenedModalBasket] = useState(false)
  const [totalPriceArr, setTotalPriceArr] = useState(
    JSON.parse(localStorage.getItem('totalArr')) || []
  )
  const [totalPrice, setTotalPrice] = useState(0)

  const getProducts = async () => {
    const response = await fetch('/api/products')
    const body = await response.json()
    localStorage.setItem('products', JSON.stringify(body))

    return body
  }

  useEffect(() => {
    getProducts().then((res) => setProducts(res))
  }, [])

  const filteredProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(value.toLowerCase())
  })

  const itemClickHandler = (e) => {
    setValue(e.target.textContent)
    setIsOpened(!isOpened)
  }
  const openHandler = () => {
    setIsOpened(true)
  }
  const openModalBasket = () => {
    setIsOpenedModalBasket((isOpenedModalBasket) => !isOpenedModalBasket)
  }

<<<<<<< HEAD
  // const addProductToBasket = async (product) => {
  //   try {
  //       const response = await fetch('/api/baskets', {
  //         method: 'POST',
  //         headers: {
  //           'Content-type': 'application/json',
  //         },
  //         body: JSON.stringify(product)
  //       })
  //       const data = await response.json()
  //       if (data.message)
  //         alert(data.message)
  //       if (data.error)
  //         alert(data.error)
  //   } catch (error) {
  //     console.log(error)
  //   }
  //   // const temp = [...productsInBasket, product];
  //   // setProductsInBasket(temp);

  //   // localStorage.setItem("productInBasket", JSON.stringify(temp));
  // }

=======
>>>>>>> 690ef5f (fixed bugs and added comp specs)
  const deleteProductFromBacket = (product) => {
    const tempProducts = [...productsInBasket]
    tempProducts.splice(product, 1)
    setProductsInBasket(tempProducts)
    localStorage.setItem('productInBasket', JSON.stringify(tempProducts))

    totalPriceArr.splice(product, 1)
    localStorage.setItem('totalArr', JSON.stringify(totalPriceArr))

    let total = 0
    for (let i = 0; i < totalPriceArr.length; i++) {
      total += totalPriceArr[i]
    }
    setTotalPrice(total)
    localStorage.setItem('totalPrice', JSON.stringify(total))
  }

  const addToTotal = (currentPrice) => {
    const temp = [...totalPriceArr, currentPrice]
    setTotalPriceArr(temp)
    console.log(temp)

    localStorage.setItem('totalArr', JSON.stringify(temp))

    let total = 0
    for (let i = 0; i < temp.length; i++) {
      total += temp[i]
    }
    console.log(total)
    setTotalPrice(total)
    localStorage.setItem('totalPrice', JSON.stringify(total))
  }

  return (
    <div className="content-main-page">
      <div style={{ display: 'flex', width: '100%' }}>
        <div style={{ width: '20%' }}></div>
        <div style={{ width: '60%' }}>
          <Input setValue={setValue} value={value} openHandler={openHandler} />
        </div>
        <div style={{ width: '20%' }}>
          <div
            style={{
              paddingRight: '20%',
              display: 'flex',
              justifyContent: 'right',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <button className="btn-open-backet" onClick={openModalBasket}>
              My basket
            </button>
          </div>
        </div>
      </div>
      <div
        style={{
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <ul className="autocomplete">
          {value && isOpened
            ? filteredProducts.map((item) => (
                <AutoComplete
                  key={item.id}
                  name={item.name}
                  itemClickHandler={itemClickHandler}
                />
              ))
            : null}
        </ul>
      </div>
<<<<<<< HEAD
      {/* <div style={{width: "100%", display: "flex", justifyContent: "center"}}> */}
        <div className="products">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <Card
                key={item.id}
                id={item.id}
                name={item.name}
                image={item.image}
                price={item.price}
                addToTotal={addToTotal}
              />
            ))
          ) : (
            <div className="preloader"></div>
          )}

        </div>
      {/* </div> */}
=======
      <div className="products">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
              price={item.price}
              addToTotal={addToTotal}
            />
          ))
        ) : (
          <div className="preloader"></div>
        )}
      </div>
>>>>>>> 690ef5f (fixed bugs and added comp specs)
      {isOpenedModalBasket && (
        <ModalBasket
          setIsOpenedModal={setIsOpenedModalBasket}
          productsInBasket={productsInBasket}
          setProductsInBasket={setProductsInBasket}
          // deleteProductFromBacket={deleteProductFromBacket}
          totalPrice={totalPrice}
          setTotalPrice={setTotalPrice}
        />
      )}
    </div>
  )
}

export default Content
