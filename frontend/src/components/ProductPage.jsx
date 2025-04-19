import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

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
    
    // const product = products.find(p => p.id === Number(id))
    const product = products.find(p => p.name === name)

    if (!product)
        return <p>Product not found</p>
  return (
    <div className='product-page'>
        {product.name}
        <img src={product.image} alt="" />
        {product.price}
    </div>
  )
}

export default ProductPage