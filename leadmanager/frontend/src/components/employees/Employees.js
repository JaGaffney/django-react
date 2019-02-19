import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getUsers } from "../../actions/users";

// for somer reason this.props.users is blank but its still generating data??
export class Employees extends Component {
  static propTypes = {
    users: PropTypes.array.isRequired,
    getUsers: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.getUsers()
  }

  handleBoolean(item){
    let returnItem
    if (item) {
      returnItem = "Yes"
    } else {
      returnItem = "No"
    }
    return returnItem
  }

  render() {

    return (
      <>
        <h2>Employees</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Employee</th>

            </tr>
          </thead>
          <tbody>
            { this.props.users.map(user => (

              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{this.handleBoolean(user.is_staff)}</td>

              </tr>
            )) }
          </tbody>
        </table>
      </>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users.users
})

export default connect(mapStateToProps, { getUsers })(Employees);
