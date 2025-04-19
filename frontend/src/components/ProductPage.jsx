import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {products} from './products'

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

    const { id } = useParams()
    
    const product = products.find(p => p.id === Number(id))

    if (!product)
        return <p>Товар не найден</p>
  return (
    <div className='product-page'>
        {product.name}
    </div>
  )
}

export default ProductPage