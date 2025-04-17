import React, { useState } from 'react'
import { MdClose } from 'react-icons/md'
import './styles/modal.css'

const Modal = (props) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [review, setReview] = useState('')

  const closeModal = () => {
    props.setIsOpenedModal((isOpenedModal) => !isOpenedModal)
  }

  const handleNameChanged = (e) => {
    setName(e.target.value)
  }
  const handleEmailChanged = (e) => {
    setEmail(e.target.value)
  }
  const handleReviewChanged = (e) => {
    setReview(e.target.value)
  }

  const sendReview = async () => {
    try {
      const newReview = {
        // id: props.reviewArr.length + props.reviewArrFromBackend.length + 1,
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
      alert('Review added!')
      window.location.href = '/reviews'
    } catch (error) {
        console.log(error)
    }

    console.log(newReview)

    props.addNewReview(newReview)
  }

  return (
    <div className="modal-overlay">
      <div>
        <div className="modal">
          <div className="feedback">
            <div style={{ display: 'flex', marginBottom: '40px' }}>
              <p className="review-title">Write a review</p>
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
                  <p className="field-name">Your name:</p>
                  <input
                    type="text"
                    name="name"
                    id="get-name"
                    value={name}
                    onChange={handleNameChanged}
                    required
                  ></input>
                </div>
                <div className="feedback-email">
                  <p className="field-name">Your email:</p>
                  <input
                    type="email"
                    name="email"
                    id="get-email"
                    value={email}
                    onChange={handleEmailChanged}
                    required
                  ></input>
                </div>
                <div className="feedback-review">
                  <p className="field-name">Your review:</p>
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
                  Add Review
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
