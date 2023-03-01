import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

import Authorization from './Authorization/Authorization';
import Logo from './UI/Logo/Logo';
import HelloMessage from './UI/HelloMessage/HelloMessage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.scss';
import { useSelector } from 'react-redux';

const token = Cookies.get('token');

function App(props) {
  const isAuth = useSelector((state) => state.user.isAuth);
  // const [isAuthorized, setAuthorized] = useState(false);
  // const [helloMessage, showHelloMessage] = useState(null);

  // useEffect(() => {
  //   if (isAuthorized) return;

  //   if (token) {
  //     async function fetchData() {
  //       const request = await fetch(`http://localhost:3000/auth/users`, {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       const responce = await request.json();

  //       showHelloMessage(<HelloMessage personName={responce.username} />);
  //     }

  //     fetchData();

  //     setAuthorized({ isAuthorized: true });
  //   }
  // }, [isAuthorized]);

  // if (isAuthorized === false) {
  //   return (
  //     <div className="App">
  //       <Logo />
  //       <Authorization />
  //     </div>
  //   );
  // } else {
  //   return (
  //     <div className="App">
  //       <Logo />
  //       {helloMessage}
  //     </div>
  //   );
  // }

  return (
    <BrowserRouter>
      <div className="App">
        <Logo />
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
