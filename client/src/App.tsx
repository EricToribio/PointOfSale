

import Credentials from './views/Credentials';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import Landing from './views/Landing';
import Main from './views/Main';

import Activate from './views/Activate';
import NotFound from './views/NotFound';
import Logout from './views/Logout';



export default() =>{
  
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
      <Route exact path='/logout'>
        <Logout/>
      </Route>
      <Route path='*'>
        <NotFound/>
      </Route>
      
      </Switch>
      
      </BrowserRouter>
    </div>
  );
}



