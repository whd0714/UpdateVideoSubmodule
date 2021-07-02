import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import HomePage from "./components/views/HomePage/HomePage";
import NavBar from "./components/views/NavBar/NavBar";
import SiderMenu from "./components/views/NavBar/Section/SiderMenu";
import { useState } from 'react';
import LoginPage from "./components/views/LoginPage/LoginPage";

function App() {

    const [collapsed, setCollapsed] = useState(false);

    const changeCollapsed = () => {
        setCollapsed(!collapsed)
    }

  return (
    <Router>
        <NavBar changeCollapsed={changeCollapsed}/>
        <SiderMenu collapsed={collapsed}/>
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/login" component={LoginPage}/>
      </Switch>
    </Router>
  );
}

export default App;
