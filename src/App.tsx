import React, {useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home'
import Chat from './components/Chat'
import firebase from 'firebase';
import firebaseConfig from './config/firebase-config';

function App() {

  useEffect(()=> {
    // firebase.initializeApp(firebaseConfig);
  }, [])

  return (
    <div className="App">

      <Router>
        <Switch>
          <Route path="/users/:id" component={Chat}/>
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
