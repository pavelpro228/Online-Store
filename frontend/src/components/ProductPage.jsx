import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AboutPC from './AboutPC'
import './styles/ProductPage.css'

const ProductPage = () => {
  const [products, setProducts] = useState([])

    const getProducts = async () => {
        const response = await fetch('/api/products')
        const body = await response.json()

        return body
    }

    useEffect(() => {
        getProducts().then((res) => setProducts(res))
    }, [])

    const { name } = useParams()
    
    const product = products.find(p => p.name === name)

    if (!product)
        return <p>Product not found</p>
  return (
    <div className='product-page'>
      <AboutPC 
        name={product.name}
        image={product.image}
        price={product.price}
        description={product.description}
        specs={product.specs}
      />
    </div>
  )
}

export default ProductPage