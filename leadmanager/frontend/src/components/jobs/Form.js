import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addJob } from "../../actions/jobs";

export class Form extends Component {
  state = {
    job_name: '',
    job_type: '',
    client_business_name: '',
    client_contact_name: '',
    client_contact_email: '',
    message: '',
    owner: '4',
    start_date: '',
    end_date: '',
    cost: ''
  }

  static propTypes = {
    addJob: PropTypes.func.isRequired
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value })

  onSubmit = e => {
    e.preventDefault()
    const { job_name, job_type, client_business_name, client_contact_name, client_contact_email, message, owner, start_date, end_date, cost } = this.state
    const job = { job_name, job_type, client_business_name, client_contact_name, client_contact_email, message, owner, start_date, end_date, cost }
    this.props.addJob(job)
    this.setState({
        job_name: '',
        job_type: '',
        client_business_name: '',
        client_contact_name: '',
        client_contact_email: '',
        message: '',
        start_date: '',
        end_date: '',
        cost: ''
    })
  }

  render() {
    const { job_name, job_type, client_business_name, client_contact_name, client_contact_email, message, start_date, end_date, cost } = this.state

    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Add Job</h2>
        <form onSubmit={this.onSubmit}>

          <div className="form-group">
            <label>Name</label>
            <input
              className="form-control"
              type="text"
              name="job_name"
              onChange={this.onChange}
              value={job_name}
            />
          </div>

          <div className="form-group">
            <label>Type</label>
            <input
              className="form-control"
              type="text"
              name="job_type"
              onChange={this.onChange}
              value={job_type}
            />
          </div>

          <div className="form-group">
            <label>Business Name</label>
            <input
              className="form-control"
              type="text"
              name="client_business_name"
              onChange={this.onChange}
              value={client_business_name}
            />
          </div>

          <div className="form-group">
            <label>Contact Name</label>
            <input
              className="form-control"
              type="text"
              name="client_contact_name"
              onChange={this.onChange}
              value={client_contact_name}
            />
          </div>

          <div className="form-group">
            <label>Contact Email</label>
            <input
              className="form-control"
              type="email"
              name="client_contact_email"
              onChange={this.onChange}
              value={client_contact_email}
            />
          </div>

          <div className="form-group">
            <label>Start Date</label>
            <input
              className="form-control"
              type="datetime-local"
              name="start_date"
              onChange={this.onChange}
              value={start_date}
            />
          </div>

          <div className="form-group">
            <label>End Date</label>
            <input
              className="form-control"
              type="datetime-local"
              name="end_date"
              onChange={this.onChange}
              value={end_date}
            />
          </div>

          <div className="form-group">
            <label>Cost $</label>
            <input
              className="form-control"
              type="number"
              name="cost"
              onChange={this.onChange}
              min="0.00"
              max="100000.00"
              step="0.01"
              value={cost}
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
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    )
  }
}



export default connect(null, { addJob })(Form)
