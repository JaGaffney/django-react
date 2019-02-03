import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

// Alert Options
const alertOptions = {
   timeout: 3000,
   position: 'top center' 
}

// Created Imports
import Header from './layout/Header'
import Footer from './layout/Footer'
import Dashboard from './leads/Dashboard'
import Alerts from './layout/Alerts'
import Login from './accounts/Login'
import Register from './accounts/Register'
import PrivateRoute from "./common/PrivateRoute"


// Redux store
import { Provider } from 'react-redux'
import store from '../store'
import { loadUser } from '../actions/auth'

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser)
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
                            <PrivateRoute exact path="/" component={Dashboard} />
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