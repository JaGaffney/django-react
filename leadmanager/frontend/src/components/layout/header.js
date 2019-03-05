import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'


export class Header extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    }

  render() {

    const { isAuthenticated, user } = this.props.auth

    const authLinks = (
        <>
            <span className="navbar-text mr-3"><strong>{ user ? `Logged in as: ${user.username}` : '' }</strong></span>
            <li className="nav-item">
                {'  '}
            </li>
            <li className="nav-item">
                <Link to="/jobs" className="nav-link">Jobs</Link>
            </li>
            <li className="nav-item">
                <Link to="/schedule" className="nav-link">Schedule</Link>
            </li>
            <li className="nav-item">
                <Link to="/leads" className="nav-link">Leads</Link>
            </li>
            <li className="nav-item">
                <Link to="/employees" className="nav-link">Employees</Link>
            </li>
            <li className="nav-item">
                <button onClick={this.props.logout} className="btn btn-primary">Logout</button>
            </li>
        </>
    )

    const guestLinks = (
        <>
            <li className="nav-item">
                <Link to="/register" className="nav-link">Register</Link>
            </li>
            <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
            </li>
        </>
    )

    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <div className="container">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-between" id="navbarTogglerDemo01">
                    <a className="navbar-brand" href="#">CRM</a>
                <ul className="navbar-nav mt-2 mt-lg-0">
                    {isAuthenticated ? authLinks : guestLinks}
                </ul>
                </div>
            </div>
        </nav>
    )
  }
}

const mapStateToProps = state => ({
    auth: state.auth
  })

export default connect(mapStateToProps, { logout })(Header)
