import React from 'react';
import './App.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import RegisterComponent from './components/register/RegisterComponent';
import LoginCompoent from './components/login/LoginComponent';
import UserProfileComponent from './components/user-profile/UserPofileComponent';
import SearchOrderComponent from './components/search-order/SearchOrderComponent';
import MainPageComponent from './components/main-page-component/MainPageComponent';
toast.configure();

class App extends React.Component {

    render() {
        return (
            <Router>
                <Route exact={true} path="/" component={MainPageComponent}/>
                <Route path="/register" component={RegisterComponent}/>
                <Route path="/login" component={LoginCompoent}/>
                <Route path="/profile/my" component={UserProfileComponent}/>
                <Route path="/orders/search" component={SearchOrderComponent}/>
            </Router>
        );
    };
}

export default App;