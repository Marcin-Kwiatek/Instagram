import './App.css';
import React,{Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import SignUp from './components/SignUp';
import LoginPage from './components/LoginPage';


class App extends Component {
  render(){
  return (
    <Router>    
      <Switch>
          <Route exact path='/'>
              <LoginPage></LoginPage>
          </Route>
          <Route exact path='/SignUp'>
              <SignUp></SignUp>
          </Route>
      </Switch>
  </Router>
  )
  }
}

export default App;
