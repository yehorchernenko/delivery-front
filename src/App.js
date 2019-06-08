import React from 'react';
import './App.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import RegisterComponent from './components/register-component/RegisterComponent';
import LoginCompoent from './components/login-component/LoginComponent';
import UserProfileComponent from './components/user-profile/UserPofileComponent';
import NavigationBarComponent from './components/navigation-bar-component/NavigationBarComponent';

toast.configure();

function App() {
    return (
        <Router>
            <NavigationBarComponent/>
            <Route path="/register" component={RegisterComponent}/>
            <Route path="/login" component={LoginCompoent}/>
            <Route path="/profile/my" component={UserProfileComponent}/>
        </Router>
  );
}

export default App;
