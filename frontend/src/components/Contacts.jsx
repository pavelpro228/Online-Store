import React from 'react';
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Contacts = () =>  (
  <div className='contacts'>
    <h1>Contacts</h1>
    <div className='list-contacts'>
      <ul>
        <li>
          <strong>Phone:</strong> +3801234567890
        </li>
        <li>
          <strong>Email:</strong> hardwarestore@gmail.com
        </li>
        <li>
          <strong>Business hours:</strong> 8AM - 8PM
        </li>
      </ul>
      <div className='social-networks-links'>
        <p style={{textAlign: 'center', }}>
          Our networks
        </p>
        <div style={{display: "flex", justifyContent: "center" }}>
          <ul>
            <li>
              <a href='https://www.facebook.com/'><FaFacebook/></a>
            </li>
            <li>
              <a href='https://x.com/home?lang=en'><FaSquareXTwitter/></a>
            </li>
            <li>
              <a href='https://www.instagram.com/'><FaInstagram/></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
)

export default Contacts;