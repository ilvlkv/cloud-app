import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

import Authorization from './Authorization/Authorization';
import Navbar from './UI/Navbar/Navbar';
import HelloMessage from './UI/HelloMessage/HelloMessage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../actions/user';

const token = Cookies.get('token');

function App(props) {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth());
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        {!isAuth && (
          <Routes>
            <Route path="/authorization" element={<Authorization />}></Route>
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
