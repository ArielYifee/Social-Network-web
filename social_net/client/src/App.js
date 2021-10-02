import React, { useMemo, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


import SingUp from "./components/SingUp";
import UserNavbar from "./components/UserNavbar";
import HomePage from "./components/LogIn";
import About from "./components/About";
import { MessengerContext } from './components/MessengerContext';
// import useLocalStorage from './components/useLocalStorage';

function App() {
  const [recipients, setRecipients] = useState();
  const value = useMemo(()=> ({recipients, setRecipients}), [recipients, setRecipients]);

  return (
    <Router>
      <Switch>
        <React.Fragment>
          <Route path="//"><HomePage /> </Route>
          <Route path="/singup/" exact component={SingUp} />
          <Route path="/about/" exact component={About} />
          <MessengerContext.Provider value={value}>
            <Route path="/user/"> <UserNavbar /></Route>
          </MessengerContext.Provider>
          {/* <Route path="/users/"> <UsersList/></Route> */}
        </React.Fragment>
      </Switch>
    </Router>
  );
}

export default App;
