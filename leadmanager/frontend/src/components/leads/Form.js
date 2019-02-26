import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addLead } from "../../actions/leads";

import animationData from '../animations/submit2.json'
import Animation from '../animations/Animation'

export class Form extends Component {
  state = {
    name: '',
    email: '',
    message: '',
    active_lead: false,
    isStopped: true
  }

  static propTypes = {
    addLead: PropTypes.func.isRequired
  }

  // non checkbox elements of the form
  onChange = e => this.setState({ [e.target.name]: e.target.value })

  // check box handlering
  onChangeCheck = e => this.setState({ active_lead: e.target.checked })

  onSubmit = e => {
    e.preventDefault()
    const { name, email, message, active_lead } = this.state
    const lead = { name, email, message, active_lead, owner: this.props.auth }

    // basic data validation, mostly on backend only for react
    let validData = true
    if (name === "" || email === "" || message === ""){
      validData = false
    }

    this.props.addLead(lead)
    this.setState({
      name: "",
      email: "",
      message: "",
      active_lead: false
    })

    // if the data was processed correctly then the animation logo will start
    if (validData){
      this.setState({
        isStopped: false,
      })
    }
  }

  render() {
    const { name, email, message } = this.state

    let animationItem = <Animation animationItemData={animationData} stopped={this.state.isStopped} isLoop={false} />

    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Create new Lead</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              onChange={this.onChange}
              value={name}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              onChange={this.onChange}
              value={email}
            />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea
              className="form-control"
              type="text"
              name="message"
              onChange={this.onChange}
              value={message}
            />
          </div>
          <div className="form-group">
            <label>Active lead</label>
            <input
              className="form-control"
              type="checkbox"
              name="active_lead"
              onChange={this.onChangeCheck}
            />
          </div>
          <div className="form-group">
            <div className="row h-100 justify-content-center align-items-center">
              <div className="form-group">
                  <button type="submit" className="btn btn-primary">
                    {animationItem}
                  </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  auth: state.auth.user.id
})

export default connect(mapStateToProps, { addLead })(Form)
