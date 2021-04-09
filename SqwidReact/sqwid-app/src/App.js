import logo from './logo.svg';
import './App.css';

import { Home } from './Home'
import { Group } from './Group'
import { User } from './User'
import { Navigation } from './Navigation'

import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <h3 className="m-3 d-flex justify-content-center">
          React JS Tutorial
      </h3>

      <Navigation/>

      <Switch>
        <Route path='/' component={Home} exact></Route>
        <Route path='/groups' component={Group}></Route>
        <Route path='/user' component={User}></Route>
      </Switch>
      </div>
    </BrowserRouter>    
  );
}

export default App;
