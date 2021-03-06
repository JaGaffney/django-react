import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../actions/auth'


export class Login extends Component {
    state = {
        username: '',
        password: '',
    }

    onSubmit = e => {
        e.preventDefault()
        this.props.login(this.state.username, this.state.password)
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value })

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />
        }

        const { username, password } = this.state

        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                    <h2 className="text-center">Login</h2>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            onChange={this.onChange}
                            value={username}
                        />
                        </div>
                        <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            onChange={this.onChange}
                            value={password}
                        />
                        </div>
                        <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                        </div>
                        <p>Don't have an account? <Link to="/register"> Register </Link></p>
                        <br></br>
                        <div className="container bg-secondary">
                            <br></br>
                            <h5>NOTE:</h5>
                            <p>You can use the following info:</p> 
                                <p><strong>Username:</strong> admin </p>
                                <p><strong>Password:</strong> test </p>
                            <p>(This will allow you to have a look at the website while it's still in development, however all data is wiped regularly so feel free to create whatever you want.)</p>
                            <br></br>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
 
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
}

export default connect(mapStateToProps, { login })(Login)
