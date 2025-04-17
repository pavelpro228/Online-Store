import React from 'react';
import { IoClose } from "react-icons/io5";

const AboutPC = () => {
    return (
      <div className='about-PC'>
        <div style={{width: '100%'}}>
          <IoClose className='icon-close' onClick={this.props.showMainContent}/>
        </div>
        <div className='main-image-computer'>
          <img style={{width: '100%'}} src={this.props.image}></img>
        </div>
      </div>
    );
}

export default AboutPC;