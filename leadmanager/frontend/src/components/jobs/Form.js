import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addJob } from "../../actions/jobs";

import animationData from '../animations/submit2.json'
import Animation from '../animations/Animation'

export class Form extends Component { 

// owner needs to be whoever is logged in, currently is setting to the id rather than the users name
// sets default for job type
  state = {
    job_name: '',
    job_type: 'Development',
    client_business_name: '',
    client_contact_name: '',
    client_contact_email: '',
    message: '',
    owner: this.props.auth,
    start_date: '',
    end_date: '',
    cost: '',
    isStopped: true
  }

  // checks for changes inside the form
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  // on submit button click
  onSubmit = e => {
    e.preventDefault()
    // data gathering
    let { job_name, job_type, client_business_name, client_contact_name, client_contact_email, message, owner, start_date, end_date, cost } = this.state
    
    let validData = true
    // data validation
    // default time values
    if (start_date === "") {
      start_date = "0001-01-01"
    }
    if (end_date === "") {
      end_date = "0001-01-01"
    }
    // date needs to be in datetime field but users dont need to not add it in as for now time is always full day
    start_date = start_date + 'T00:00:00Z'
    end_date = end_date + 'T00:00:00Z'

    if (job_name === "" || job_type === "" || client_business_name === "" || client_contact_name === "" || client_contact_email === "" || cost === ""){
      validData = false
    }

    // creates a valid object that can be sent to the API
    const job = { job_name, job_type, client_business_name, client_contact_name, client_contact_email, message, owner, start_date, end_date, cost }
    this.props.addJob(job)

    // resetting data back to default values
    this.setState({
        job_name: '',
        job_type: 'Development',
        client_business_name: '',
        client_contact_name: '',
        client_contact_email: '',
        message: '',
        start_date: '',
        end_date: '',
        cost: '' 
    })

    // if the data was processed correctly then the animation logo will start
    if (validData){
      this.setState({
        isStopped: false
      })
    }
  }

  render() {
    const { job_name, job_type, client_business_name, client_contact_name, client_contact_email, message, start_date, end_date, cost } = this.state

    return (
        <>
        <div className="card card-body mt-4 mb-4">

          <div className="float-right">
            <button type="button" className="close btn btn-danger" aria-label="Close" onClick={this.props.onFormHandler}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
      
        <h2>Create new Job</h2>
        <br></br>

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
            <select
              className="form-control"
              type="text"
              name="job_type"
              onChange={this.onChange}
              value={job_type}
            >
            <option defaultValue="Development">Development</option>
            <option value="Research">Research</option>
            <option value="Design">Design</option>
            <option value="Quote">Quote</option>
            <option value="Other">Other</option>
          </select>
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
              type="date"
              name="start_date"
              onChange={this.onChange}
              value={start_date}
            />
          </div>

          <div className="form-group">
            <label>End Date</label>
            <input
              className="form-control"
              type="date"
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
            <label>Additional Info</label>
            <textarea
              className="form-control"
              type="text"
              name="message"
              onChange={this.onChange}
              value={message}
            />
          </div>

          <div className="container h-40">
            <div className="row h-100 justify-content-center align-items-center">
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                      <Animation animationItemData={animationData} stopped={this.state.isStopped} isLoop={false} />
                    </button>
                </div>
            </div>
        </div>
        </form>
      </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth.user.id
})

Form.propTypes = {
  addJob: PropTypes.func.isRequired,
  auth: PropTypes.number,
  onFormHandler: PropTypes.func
}

export default connect(mapStateToProps, { addJob })(Form)
