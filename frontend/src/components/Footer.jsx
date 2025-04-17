import React, { useState } from 'react';
import Tooltip from './Tooltip/Tooltip'
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () =>  {
  const [openedListLanguages, setListLanguages] = useState(false)
  const infoTextForFacebook = useState("We on the Facebook")
  const infoTextForTwitter = useState("We on the X")
  const infoTextForInstagram = useState("We on the Instagram")
  
  const openListLanguage = () => {
    setListLanguages((openedListLanguages) => !openedListLanguages)
  }
    return (
      <footer className='footer'>
          <div className='social-networks-links-footer'>
            <p>
              Our networks
            </p>
            <ul className='networks'>
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
      </footer>
    );
}

export default Footer;