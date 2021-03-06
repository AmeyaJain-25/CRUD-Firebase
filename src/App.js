import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
//Firebase
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore"

import { useState } from 'react';
import { UserContext } from './context/UserContext';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Header from './layout/Header';
import firebaseConfig from './util/firebaseConfig';


//init firebase
firebase.initializeApp(firebaseConfig);

const App = () => {
  const [user, setUser] = useState(null);


  return (
    <Router>
      <UserContext.Provider value={{user, setUser}}>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="*" component={Home} />
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
