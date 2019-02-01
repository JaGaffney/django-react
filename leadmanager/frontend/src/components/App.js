import React, { Component } from 'react'
import ReactDom from 'react-dom'

import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

// Alert Options
const alertOptions = {
   timeout: 3000,
   position: 'top center' 
}

// Created Imports
import Header from './layout/Header'
import Dashboard from './leads/Dashboard'
import Alerts from './layout/Alerts'

// Redux store
import { Provider } from 'react-redux'
import store from '../store'

class App extends Component {
    render() {
        return (
            <Provider store={store}>
            <AlertProvider template={AlertTemplate} {...alertOptions}>
            <>
                <Header />
                <Alerts />
                <div className="container">
                    <Dashboard />
                </div>

            </>
            </AlertProvider>
            </Provider>
        )
    }
}

ReactDom.render(<App />, document.getElementById('app'))