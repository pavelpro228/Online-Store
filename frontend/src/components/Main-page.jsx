import React, { useEffect, useState } from 'react'

import Input from './Input'
import AutoComplete from './AutoComplete'
import Card from './Card'
import ModalProductFilter from './ModalProductFilter'

import { LuSettings2 } from "react-icons/lu";

import './styles/AutoComplete.css'
// import Carousel from './Carousel'

const Content = () => {
  const [products, setProducts] = useState([])

  const [value, setValue] = useState('')
  const [isOpened, setIsOpened] = useState(true)
  const [isOpenedProductFilter, setIsOpenedProductFilter] = useState(false)
  const [totalPriceArr, setTotalPriceArr] = useState(
    JSON.parse(localStorage.getItem('totalArr')) || []
  )
  const [totalPrice, setTotalPrice] = useState(0)
  const [filteredProducts, setFilteredProducts] = useState([]);

  const getProducts = async () => {
    const response = await fetch('/api/products')
    const body = await response.json()

    return body
  }

  useEffect(() => {
    getProducts().then((res) => setProducts(res))
  }, [])

  const handleProductFilter = () => {
    setIsOpenedProductFilter(!isOpenedProductFilter)
  }

  const searchedProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(value.toLowerCase())
  })

  const productsFilter = (categoryArr, brandArr) => {
    const filter = products.filter(product => {
      if (categoryArr.length > 0 && brandArr.length > 0)
        return (categoryArr.includes(product.specs.type) && brandArr.includes(product.manufacturer))
      else if (categoryArr.length > 0 || brandArr.length > 0)
        return (categoryArr.includes(product.specs.type) || brandArr.includes(product.manufacturer))
    });

    if (filter.length == 0) alert('Таких товарів немає :(')
    else {
      setFilteredProducts(filter);
      handleProductFilter()
    }
  }

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
        <div style={{ width: '60%', display: "flex", justifyContent: "center" }}>
          <div style={{display: "flex"}}>
            <Input setValue={setValue} value={value} openHandler={openHandler} />
            <div style={{display: "flex", alignItems: "center", marginLeft: "20px"}}>
              <LuSettings2 className='settings-products-button' onClick={handleProductFilter}/>
            </div>
          </div>
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
            ? (searchedProducts).map((item) => (
                <AutoComplete
                  key={item._id}
                  name={item.name}
                  itemClickHandler={itemClickHandler}
                />
              ))
            : null}
        </ul>
      </div>
      <div style={{display: "flex", justifyContent: "center"}}>
        <div className="products">
          {products.length > 0 ? (filteredProducts.length > 0 ? filteredProducts : searchedProducts).map((item) => (
            <Card
              key={item._id}
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
              addToTotal={addToTotal}
            />
          )) : <div className="preloader"></div>}
        </div>
      </div>
      {isOpenedProductFilter && <ModalProductFilter productsFilter={productsFilter} handleProductFilter={handleProductFilter}/>}
    </div>
  )
}

export default Content