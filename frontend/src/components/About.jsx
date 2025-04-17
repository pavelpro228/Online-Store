import React from 'react';
import "./styles/About.css"
import ImageStore1 from "./images/image-store1.jpg"
import ImageStore2 from "./images/image-store2.jpg"
import ImageStore3 from "./images/image-store3.jpg"
import ImageStore4 from "./images/image-store4.jpg"

const About = () => {
    return (
      <div className='content' style={{display: "flex"}}>
        <div className='text-about'>
          <p>
          This site will help you find the right computer for you.
          For example, for video games or other heavy programs.<br/> <br/>
          The employees treat the client’s wishes very competently and 
          help to select the product to meet the desired requirements.
          </p>
        </div>
        <div className='images-about'>
          <div className='images'>
            <img src={ImageStore1}></img>
            <img src={ImageStore2}></img>
            <img src={ImageStore3}></img>
            <img src={ImageStore4}></img>
          </div>
        </div>
      </div>
    );
}

export default About;