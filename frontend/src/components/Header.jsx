import React, { useState } from 'react';
import ModalLanguage from './ModalLanguage'
import ModalBasket from './ModalBasket'
import { RxHamburgerMenu } from "react-icons/rx";
import { FaUserAlt } from "react-icons/fa";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const Header = () => {
    const [openedUserMenu, setUserMenu] = useState(false);
    const [isOpenedModalLanguages, setIsOpenedModalLanguages] = useState(false);

    const [isOpenedModalBasket, setIsOpenedModalBasket] = useState(false)
    const [productsInBasket, setProductsInBasket] = useState([])

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
    const logout = () => {
      localStorage.removeItem('user')
      closeUserMenu()
      alert('Ви вийшли з акаунту!')
    }

    const openModalBasket = () => {
      setIsOpenedModalBasket((isOpenedModalBasket) => !isOpenedModalBasket)
    }

    return (
      <header className='header'>
        <div className='store-name'>
          <Link to='/'>
            <p>Hardware Store</p>
          </Link>
        </div>
        <div className='navigation'>
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
          </div>
          <div className='user'>
            <button className="btn-open-basket" onClick={openModalBasket}>
              Кошик
            </button>
            <FaUserAlt onClick={clickOnUserMenu} className='user-button'/>
            <div className='burger-menu-button'>
              <RxHamburgerMenu />
            </div>
          </div>
          {openedUserMenu &&(
            <ul className='user-menu'>
              <div style={{width: "100%"}}>
                <Link to="/authorization">{!localStorage.getItem('user') && <li onClick={closeUserMenu} className='authorization-button'>Авторизація</li>}</Link>
                <li onClick={openModalLanguages} className='basket-button'>Мова</li>
                <Link to="/myInfo"><li onClick={closeUserMenu} className='info-button'>Мій кабінет</li></Link>
                {localStorage.getItem('user') && <li onClick={logout} className='sign-out-button'>Вийти</li>}
              </div>
            </ul>
          )}
          {isOpenedModalBasket && (
            <ModalBasket
              setIsOpenedModal={setIsOpenedModalBasket}
              productsInBasket={productsInBasket}
              setProductsInBasket={setProductsInBasket}
            />
          )}
      </header>
    );
}

export default Header;