import React, { useState } from 'react'
import { MdClose } from 'react-icons/md'
import './styles/modal.css'

const Modal = (props) => {
  const [name, setName] = useState('')
  const [review, setReview] = useState('')
  
  const email = localStorage.getItem('email')

  const closeModal = () => {
    props.setIsOpenedModal((isOpenedModal) => !isOpenedModal)
  }

  const handleNameChanged = (e) => {
    setName(e.target.value)
  }
  const handleReviewChanged = (e) => {
    setReview(e.target.value)
  }

  const sendReview = async () => {
    try {
      const newReview = {
        userName: name,
        email: email,
        text: review,
      }
      const response = await fetch('/api/add-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview)
      })
      const data = await response.json()
      if (data.message) {
        alert(data.message)
        window.location.href = '/reviews'
      }
      if (data.error)
        alert(data.error)
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div className="modal-overlay">
      <div>
        <div className="modal">
          <div className="feedback">
            <div style={{ display: 'flex', marginBottom: '40px' }}>
              <p className="review-title">Написати відгук</p>
              <MdClose className="btn-close" onClick={closeModal} />
            </div>
            <form action="https://api.web3forms.com/submit" method="POST">
              <input
                type="hidden"
                name="access_key"
                value="05326e0d-1a96-497c-afda-7d51d79350bf"
              ></input>
              <div style={{ textAlign: 'center' }}>
                <div className="feedback-name">
                  <p className="field-name">Ім'я:</p>
                  <input
                    type="text"
                    name="name"
                    id="get-name"
                    value={name}
                    onChange={handleNameChanged}
                    required
                  ></input>
                </div>
                <div className="feedback-review">
                  <p className="field-name">Ваш відгук:</p>
                  <textarea
                    type="text"
                    name="review"
                    id="get-review"
                    value={review}
                    onChange={handleReviewChanged}
                    required
                  ></textarea>
                </div>
              </div>
              <div className="btn-add-review">
                <button
                  onClick={() => {
                    sendReview()
                    closeModal()
                  }}
                >
                  Додати відгук
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
