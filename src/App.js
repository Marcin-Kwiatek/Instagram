import './App.css';
import React,{Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import SignUp from './components/SignUp';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';


class App extends Component {
  render(){
  return (
    <Router>    
      <Switch>
          <Route exact path='/SignIn'>
              <LoginPage></LoginPage>
          </Route>
          <Route exact path='/SignUp'>
              <SignUp></SignUp>
          </Route>
          <Route exact path='/'>
              <MainPage></MainPage>
          </Route>
      </Switch>
  </Router>
  )
  }
}

export default App;
