
import './App.css';
import Credentials from './views/Credentials';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
      <Route exact path='/login'>
      <Credentials page={"Login"}/>
      </Route>
      <Route exact path='/register'>
        <Credentials page={"Register"}/>
      </Route>
      </Switch>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
