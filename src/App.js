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
import OrderDetailComponent from './components/order-detail-component/OrderDetailComponent';
import AddOrderComponent from './components/add-order-component/AddOrderComponent';
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
                <Route path="/orders/byID/:id" component={OrderDetailComponent}/>
                <Route path="/orders/add" component={AddOrderComponent}/>
            </Router>
        );
    };
}

export default App;