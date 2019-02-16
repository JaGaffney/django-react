import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

// Alert Options
const alertOptions = {
   timeout: 4000,
   position: 'top center' 
}

// Created Imports
//layout
import Header from './layout/Header'
import Footer from './layout/Footer'
import Alerts from './layout/Alerts'

// pages
import Home from './home/Home'
import LeadDashboard from './leads/Dashboard'
import JobDashboard from './jobs/JobsDashboard'
import Employees from './employees/Employees'
import Login from './accounts/Login'
import Register from './accounts/Register'

// other
import PrivateRoute from "./common/PrivateRoute"


// Redux store
import { Provider } from 'react-redux'
import store from '../store'
import { loadUser } from "../actions/auth"

class App extends Component {
    componentDidMount() {
        // loadUser is a function
        store.dispatch(loadUser())
    }

    render() {
        return (
            <Provider store={store}>
            <AlertProvider template={AlertTemplate} {...alertOptions}>
            <Router>
                <>
                    <Header />
                    <Alerts />
                    <div className="container">
                        <Switch>
                            <PrivateRoute exact path="/" component={Home} />
                            <PrivateRoute exact path="/leads" component={LeadDashboard} />
                            <PrivateRoute exact path="/jobs" component={JobDashboard} />
                            <PrivateRoute exact path="/employees" component={Employees} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/register" component={Register} />
                        </Switch>
                    </div>
                    <Footer />
                </>
            </Router>
            </AlertProvider>
            </Provider>
        )
    }
}

ReactDom.render(<App />, document.getElementById('app'))