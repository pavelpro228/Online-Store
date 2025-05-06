import React from 'react';
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Contacts = () =>  (
  <div className='contacts'>
    <h1>Контактна інформація</h1>
    <div className='list-contacts'>
      <ul>
        <li>
          <strong>Телефон:</strong> +3801234567890
        </li>
        <li>
          <strong>Електронна пошта:</strong> hardwarestore@gmail.com
        </li>
        <li>
          <strong>Працюємо:</strong> 8:00 - 20:00
        </li>
      </ul>
      <div className='social-networks-links'>
        <p style={{textAlign: 'center', }}>
          Наші соцмережі
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