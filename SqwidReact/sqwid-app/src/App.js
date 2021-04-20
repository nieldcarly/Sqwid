import './App.css';

import { Home } from './Components/Home';
import { Group } from './Components/Group';
import { User } from './Components/User';
import { Navigation } from './Components/Navigation';
import {GroupEvents} from './Components/Event';
import {Creation} from './Components/Creation';
import { CreationDetails } from './Components/CreationDetails.js';
import {Image} from 'react-bootstrap';
import Login from './Components/Login';
import Logout from './Components/Logout';
import {Create} from './Components/Create';
import style from './site.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { UserEvents } from './Components/UserEvents';

function App() {
  // const { token, setToken } = useToken();

  // if(!token) {
  //   return <Login setToken={setToken} />
  // }

  return (
    <BrowserRouter>
      <div className="container">
        <a href="/">
          <h1 className="main-header m-3 d-flex">
              <span><Image src={"../Sqwig.svg"} className="main-header-image"></Image></span>
              <span className="main-header-text">Sqwid</span>
          </h1>
        </a>


        <Navigation/>

        <Switch>
          <Route path='/' component={Home} exact></Route>
          <Route path='/groups' component={Group}></Route>
          <Route path='/user' component={User}></Route>
          <Route path="/event/:groupId" exact component={GroupEvents} />
          <Route path="/creations/:eventId" exact component={Creation} />
          <Route path="/creationdetails/:creationId" exact component={CreationDetails} />
          <Route path="/login" exact component={Login}></Route>
          <Route path="/create" exact component={Create}></Route>
          <Route path="/userevents" exact component={UserEvents}></Route>
          <Route path="/logout" exact component={Logout}></Route>
        </Switch>
      </div>
    </BrowserRouter>    
  );
}

export default App;
