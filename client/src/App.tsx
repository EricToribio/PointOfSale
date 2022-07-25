
import './App.css';
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


function App() {
  const [loggedInUser, setLoggedInUser] = React.useState(
    Cookies.get("user_id") ? jwt_decode(Cookies.get("user_id")) : "no user"
  )
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
      <Route exact path='/login'>
      <Credentials page={"Login"} />
      </Route>
      <Route exact path='/register'>
        <Credentials page={"Register"} />
      </Route>
      <Route exact path='/'>
        <Landing/>
      </Route>
      <Route exact path='/main'>
        <Main/>
      </Route>
      </Switch>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
function jwt_decode(arg0: any): any {
  throw new Error('Function not implemented.');
}

