import React, { useEffect, useState } from 'react'

import Input from './Input'
import AutoComplete from './AutoComplete'
import Card from './Card'

import './styles/AutoComplete.css'
// import Carousel from './Carousel'

const Content = () => {
  const [products, setProducts] = useState([])

  const [value, setValue] = useState('')
  const [isOpened, setIsOpened] = useState(true)
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
      {/* <Carousel /> */}
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
      <div style={{display: "flex", justifyContent: "center"}}>
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
      </div>
    </div>
  )
}

export default Content
