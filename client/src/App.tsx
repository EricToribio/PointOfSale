

import Credentials from './views/Credentials';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import React from 'react';
import Cookies from "js-cookie"
import Landing from './views/Landing';
import Main from './views/Main';
import jwt_decode from 'jwt-decode';
import { MyToken } from './helper/validation';
import Activate from './views/Activate';


export default() =>{
  const loggedInUser = React.useState(
    Cookies.get("user_id") ? jwt_decode<MyToken>(Cookies.get("user_id")!) : "no user"
    )
  console.log(loggedInUser)
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
      <Route exact path='/login'>
      <Credentials page={"Login"} />
      </Route>
      <Route exact path='/register'>
        <Credentials page={"Register"}/>
      </Route>
      <Route exact path='/'>
        <Landing/>
      </Route>
      <Route exact path='/main'>
        <Main/>
      </Route>
      <Route exact path='/activate'>
        <Activate/>
      </Route>
      </Switch>
      
      </BrowserRouter>
    </div>
  );
}



