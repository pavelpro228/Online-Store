import React, { useState } from 'react';
import ModalLanguage from './ModalLanguage'
import ModalBasket from './ModalBasket'
import { RxHamburgerMenu } from "react-icons/rx";
import { FaUserAlt } from "react-icons/fa";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const Header = () => {
    const [openedUserMenu, setUserMenu] = useState(false);
    const [isOpenedModalLanguages, setIsOpenedModalLanguages] = useState(false);
    // const [isOpenedModalBasket, setIsOpenedModalBasket] = useState(false);

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
    // const openModalBasket = () => {
    //   setIsOpenedModalBasket(isOpenedModalBasket => !isOpenedModalBasket);
    //   closeUserMenu();
    // }
    const logout = () => {
      localStorage.removeItem('email')
      closeUserMenu()
      alert('Ви вийшли з акаунту!')
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
                    Головна
                  </Link>
                </li>
                <li>
                  <Link to="/about">
                    Про нас
                  </Link>
                </li>
                <li>
                  <Link to="/contacts">
                    Контакти
                  </Link>
                </li>
                <li>
                  <Link to="/reviews">
                    Відгуки
                  </Link>
                </li>
            </ul>
            <div className='user-button'>
              <FaUserAlt onClick={clickOnUserMenu} className='user-button-icon'/>
            </div>
              {openedUserMenu &&(
                <ul className='user-menu'>
                  <div style={{width: "100%"}}>
                    <Link to="/authorization">{!localStorage.getItem('email') && <li onClick={closeUserMenu} className='authorization-button'>Авторизація</li>}</Link>
                    <li onClick={openModalLanguages} className='basket-button'>Мова</li>
                    {/* <li onClick={openModalBasket} className='basket-button'>Basket</li> */}
                    <Link to="/myInfo"><li onClick={closeUserMenu} className='info-button'>Мій кабінет</li></Link>
                    {localStorage.getItem('email') && <li onClick={logout} className='sign-out-button'>Вийти</li>}
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