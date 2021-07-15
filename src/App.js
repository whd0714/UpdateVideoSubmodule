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
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Template from "./components/views/Formik/Template";
import auth from "./hoc/auth";
import UploaderPage from "./components/views/UploaderPage/UploaderPage";

function App() {

    const [collapsed, setCollapsed] = useState(false);

    const changeCollapsed = () => {
        setCollapsed(!collapsed)
    }

  return (
    <div>
        <Router>
            <NavBar changeCollapsed={changeCollapsed}/>
            <SiderMenu collapsed={collapsed}/>
            <Switch>
                <Route exact path="/" component={auth(HomePage, null)}/>
                <Route exact path="/login" component={auth(LoginPage, false)}/>
                <Route exact path="/signup" component={auth(RegisterPage, false)}/>
                <Route exact path="/channel/:memberId/main" component={auth(UploaderPage, true)}/>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
