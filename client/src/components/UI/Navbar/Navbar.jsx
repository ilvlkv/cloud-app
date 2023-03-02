import React, { useState } from 'react';
import './Navbar.scss';
import Logo from '../Logo/Logo';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../reducers/userReducer';

function Navbar() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();

  return (
    <nav className="navbar">
      <NavLink to="/main">
        <Logo />
      </NavLink>

      {!isAuth && (
        <NavLink to={'/authorization'} className={`auth-btn`}>
          <div className="auth-btn_logo"></div>
          <p className="auth-btn_text">Войти</p>
        </NavLink>
      )}
      {isAuth && (
        <div
          onClick={() => dispatch(logout())}
          className={`auth-btn auth-btn_logout`}
        >
          <div className="auth-btn_logo"></div>
          <p className="auth-btn_text">Выйти</p>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
