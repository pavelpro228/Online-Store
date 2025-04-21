import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import './Styles/Carousel.css' // Подключаем стили

const image = './components/images/facebook-logo'

export default function Carousel() {
  const [products, setProducts] = useState([])
  const [index, setIndex] = useState(0)

  const nextSlide = () => setIndex((prev) => (prev + 1) % image.length)
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + image.length) % image.length)

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [])

  const getProducts = async () => {
    const response = await fetch('/api/products')
    const body = await response.json()

    return body
  }

  useEffect(() => {
    getProducts().then((res) => setProducts(res))
  }, [])

  return (
    <div className="carousel-container">
      <div>
        <img src={image} alt="" className="carousel-image" />
      </div>

      <button className="carousel-button left" onClick={prevSlide}>
        <ChevronLeft />
      </button>
      <button className="carousel-button right" onClick={nextSlide}>
        <ChevronRight />
      </button>

      {/* <div className="carousel-indicators">
        {images.map((_, i) => (
          <div
            key={i}
            className={`indicator ${i === index ? "active" : ""}`}
          />
        ))}
      </div> */}
    </div>
  )
}
