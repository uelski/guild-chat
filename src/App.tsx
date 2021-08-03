import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home';
import Chat from './components/Chat';
import styles from './App.module.css';


function App() {

  return (
    <div className={styles.App}>

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
