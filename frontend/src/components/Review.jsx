import React from 'react';
import './styles/Review.css'
import { IoTrashBinSharp } from "react-icons/io5";

const Review = (props) => {
  return (
    <div>
      <div className='review-component'>
        <div style={{width: "95%"}}>
          <h1 className='username'>
            <p className='title-data'>Name:</p> <p className='data-info'>{props.dataName}</p>
          </h1>
          <p className='review'>
          <span className='title-data'>Review:</span> <span className='data-info'>{props.reviewText}</span>
          </p>
        </div>
        <div style={{textAlign: "right"}}>
          <IoTrashBinSharp onClick={props.deleteReview} className='delete-review'/>
        </div>
      </div>
    </div>
  );
};

export default Review;