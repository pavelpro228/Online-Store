import React from 'react';
import './styles/Input.css';

const Input = (props) => {
    return (
      <div className='search'>
        <input 
          className='search-input' 
          placeholder='Шукати товар' 
          onChange={(e) => props.setValue(e.target.value)}
          onClick={props.openHandler}
          value={props.value}
        ></input>
      </div>
    );
}

export default Input;