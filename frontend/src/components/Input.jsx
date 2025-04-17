import React from 'react';
import './styles/Input.css';
// import { IoSearch } from "react-icons/io5";

const Input = (props) => {
    return (
      <div className='search'>
        <input 
          className='search-input' 
          placeholder='Search product' 
          onChange={(e) => props.setValue(e.target.value)}
          onClick={props.openHandler}
          value={props.value}
        ></input>
      </div>
    );
}

export default Input;