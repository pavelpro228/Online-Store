import React, { useState, useEffect } from 'react'
import Review from './Review'
import ModalReview from './ModalReview'
import './styles/Reviews.css'

const Reviews = () => {
  const [reviews, setReviews] = useState([])
  const [isOpenedModal, setIsOpenedModal] = useState(false)

  const getReviews = async () => {
    const response = await fetch('/api/reviews')
    const body = await response.json()

    console.log(body)
    return body
  }

  useEffect(() => {
    getReviews().then((res) => setReviews(res))
  }, [])

  const openModal = () => {
    setIsOpenedModal((isOpenedModal) => !isOpenedModal)
  }

  const deleteReview = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        const response = await fetch('/api/delete-review', {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ id: id, email: localStorage.getItem('email') }),
          
        })
        setReviews(prev => prev.filter(r => r._id !== id));
        
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className="reviews-components">
      <div style={{ display: 'flex' }}>
        <div style={{ width: '33%' }}></div>
        <h1 style={{ width: '34%' }} className="namepage">
          Відгуки
        </h1>
        <div className="btn-add-review" style={{ width: '33%' }}>
          <button onClick={openModal} type="submit">
            Додати відгук
          </button>
        </div>
      </div>
      <div style={{display: "flex", justifyContent: "center"}}>
        <div>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <Review
                key={review._id}
                dataName={review.userName}
                reviewText={review.text}
                email={review.email}
                deleteReview={() => deleteReview(review._id)}
              />
            ))
          ) : (
            <div className="preloader"></div>
          )}
        </div>
      </div>
      {isOpenedModal && (
        <ModalReview
          isOpenedModal={isOpenedModal}
          setIsOpenedModal={setIsOpenedModal}
          getReviews={getReviews}
        />
      )}
    </div>
  )
}

export default Reviews
