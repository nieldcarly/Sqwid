import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import useToken from './useToken';

import { Home } from './Home';
import { Group } from './Group';
import { User } from './User';
import { Navigation } from './Navigation';
import {Event} from './Event';
import {Creation} from './Creation';
import { CreationDetails } from './CreationDetails.js';
import {Image} from 'react-bootstrap';
import Login from './Login';
import style from './site.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <BrowserRouter>
      <div className="container">
        <h1 className="main-header m-3 d-flex">
            <span><Image height="100px" src={"./Sqwig.svg"}></Image></span>
            <span style={{"paddingLeft":10, "paddingTop":20}}>Sqwid</span>
        </h1>

        <Navigation/>

        <Switch>
          <Route path='/' component={Home} exact></Route>
          <Route path='/groups' component={Group}></Route>
          <Route path='/user' component={User}></Route>
          <Route path="/event/:groupId" exact component={Event} />
          <Route path="/creations/:eventId" exact component={Creation} />
          <Route path="/creationdetails/:creationId" exact component={CreationDetails} />
        </Switch>
      </div>
    </BrowserRouter>    
  );
}

export default App;
