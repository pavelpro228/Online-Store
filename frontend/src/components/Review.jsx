import React from 'react';
import './styles/Review.css'
import { IoTrashBinSharp } from "react-icons/io5";

const Review = (props) => {
  return (
    <div>
      <div className='review-component'>
        <div style={{width: "95%"}}>
          <h1 className='username'>
            <p className='title-data'>Ім'я:</p> <p className='data-info'>{props.dataName}</p>
          </h1>
          <p className='review'>
          <span className='title-data'>Відгук:</span> <span className='data-info'>{props.reviewText}</span>
          </p>
        </div>
        {props.email === localStorage.getItem('email') && <div style={{textAlign: "right"}}>
          <IoTrashBinSharp onClick={props.deleteReview} className='delete-review'/>
        </div>}
      </div>
    </div>
  );
};

export default Review;