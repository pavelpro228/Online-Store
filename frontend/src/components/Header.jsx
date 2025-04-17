import React, { useState } from 'react';
import ModalLanguage from './ModalLanguage'
import ModalBasket from './ModalBasket'
import { RxHamburgerMenu } from "react-icons/rx";
import { FaUserAlt } from "react-icons/fa";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const Header = () => {
    const [openedUserMenu, setUserMenu] = useState(false);
    const [isLoginUser, setLoginUser] = useState(false);
    const [isOpenedModalLanguages, setIsOpenedModalLanguages] = useState(false);
    const [isOpenedModalBasket, setIsOpenedModalBasket] = useState(false);

    const clickOnUserMenu = () => {
      setUserMenu(openedUserMenu => !openedUserMenu)
    }
    const closeUserMenu = () => {
      clickOnUserMenu();
    }
    const openModalLanguages = () => {
      setIsOpenedModalLanguages(isOpenedModalLanguages => !isOpenedModalLanguages);
      closeUserMenu();
    }
    const openModalBasket = () => {
      setIsOpenedModalBasket(isOpenedModalBasket => !isOpenedModalBasket);
      closeUserMenu();
    }

    return (
      <header className='header'>
        <div className='store-name'>
          <Link to='/'>
            <p>Hardware Store</p>
          </Link>
        </div>
          <div className='shop-info'>
            <p>This is a simple website written in React.</p>
          </div>
          <nav className='header-list'>
            <ul>
                <li>
                  <Link to="/">
                    Main
                  </Link>
                </li>
                <li>
                  <Link to="/about">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contacts">
                    Contacts
                  </Link>
                </li>
                <li>
                  <Link to="/reviews">
                    Reviews
                  </Link>
                </li>
            </ul>
            <div className='user-button'>
              <FaUserAlt onClick={clickOnUserMenu} className='user-button-icon'/>
            </div>
              {openedUserMenu &&(
                <ul className='user-menu'>
                  <div style={{width: "100%"}}>
                    <Link to="/authorization">{!isLoginUser && <li onClick={closeUserMenu} className='authorization-button'>Sign up / Sign in</li>}</Link>
                    <li onClick={openModalLanguages} className='basket-button'>Language</li>
                    {/* <li onClick={openModalBasket} className='basket-button'>Basket</li> */}
                    <Link to="/myInfo"><li onClick={closeUserMenu} className='info-button'>My info</li></Link>
                    <Link to="/signOut">{isLoginUser && <li onClick={closeUserMenu} className='sign-out-button'>Sign out</li>}</Link>
                  </div>
                </ul>
              )}
              <div className='burgermenu'>
                <RxHamburgerMenu />
              </div>
          </nav>
          {isOpenedModalLanguages && <ModalLanguage setIsOpenedModal={setIsOpenedModalLanguages}/>}
          
      </header>
    );
}

export default Header;