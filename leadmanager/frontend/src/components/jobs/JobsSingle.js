import React, { Component } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateJob } from "../../actions/jobs";

export class JobsSingle extends Component {
  state = {
    editMode: false,
    editColorPrimary: "card text-white mb-3 bg-primary",
    editColorSuccess: "card text-white mb-3 bg-success",
    editColor: "",
    job_name: "",
    job_type: "",
    client_business_name: "",
    client_contact_name: "",
    client_contact_email: "",
    message: "",
    owner: "",
    start_date: "",
    end_date: "",
    cost: "",
  }

  static propTypes = {
    updateJob: PropTypes.func.isRequired
  }

  // Sets the inital colours
  componentDidMount(){
    this.setState({ 
      editColor: this.state.editColorPrimary 
    })
  }

  // handle if editing mode is set as well as its colours
  handleEditMode(){
    this.setState(prevState => {
      // settings vars
      const updatedState = prevState
      let newColor = this.state.editColorPrimary
      // 
      if (prevState.editColor == this.state.editColorPrimary) {
        newColor = this.state.editColorSuccess
      }
      return { 
        editColor: newColor,
        editMode: !updatedState.editMode
      } 
    })

    // sets state to job info once edit mode is triggerd
    this.setState({
      job_name: this.props.jobInfo.job_name,
      job_type: this.props.jobInfo.job_type,
      client_business_name: this.props.jobInfo.client_business_name,
      client_contact_name: this.props.jobInfo.client_contact_name,
      client_contact_email: this.props.jobInfo.client_contact_email,
      message: this.props.jobInfo.message,
      owner: this.props.jobInfo.owner,
      start_date: this.props.jobInfo.start_date.slice(0, -10),
      end_date: this.props.jobInfo.end_date.slice(0, -10),
      cost: this.props.jobInfo.cost,
    })
  }

  // Form AREA
  // checks for changes inside the form
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  // on submit button click
  onSubmit = e => {
    e.preventDefault()
    // data gathering
    let { job_name, job_type, client_business_name, client_contact_name, client_contact_email, message, owner, start_date, end_date, cost } = this.state
    
    // data validation
    // default time values
    if (start_date === "") {
      start_date = "0001-01-01"
    }
    if (end_date === "") {
      end_date = "0001-01-01"
    }
    // date needs to be in datetime field but users dont need to not add it in as for now time is always full day
    start_date = start_date + 'T00:00'
    end_date = end_date + 'T00:00'

    // creates a valid object that can be sent to the API
    const job = { id: this.props.jobInfo.id, created_at: this.props.jobInfo.created_at, job_name, job_type, client_business_name, client_contact_name, client_contact_email, message, owner, start_date, end_date, cost }
    this.props.updateJob(this.props.jobInfo.id, job)
    
    // resetting data back to default values
    this.setState({
      job_name: '',
      job_type: '',
      client_business_name: '',
      client_contact_name: '',
      client_contact_email: '',
      message: '',
      start_date: '',
      end_date: '',
      cost: '',
      editMode: false,
      editColor: this.state.editColorPrimary
    })

    // closes down the form
    // NOTE not working
    this.props.JobsPageHandler
  }

  render() {
    // dynamic rendering depeding on if edit mode is enabled or not
    let cardPage
    if (!this.state.editMode) {
      cardPage = (
        <div className="card card-body mt-4 mb-4">
          
        <div className="float-right">
          <button type="button" className="close btn btn-danger" aria-label="Close" onClick={this.props.JobsPageHandler}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div className="btn-toolbar">
          <button className="btn btn-success ml-2" onClick={this.handleEditMode.bind(this)}>Edit mode</button>
        </div>
        <br></br>

        <h3>Name: {this.props.jobInfo.job_name} ID: {this.props.jobInfo.id}</h3> 

          <div className={this.state.editColor} style={{ minWidth: '15rem',  marginTop: '2rem' }}>
              <div className="card-header">Contact Info</div>
                <div className="card-body">
                    <p className="card-text">Business Name: {this.props.jobInfo.client_business_name}</p>
                    <p className="card-text">Contact Name: {this.props.jobInfo.client_contact_name}</p>
                    <p className="card-text">Contact Email: {this.props.jobInfo.client_contact_email}</p>
                </div>
          </div>

          <div className={this.state.editColor} style={{ minWidth: '15rem',  marginTop: '2rem' }}>
              <div className="card-header">Job Info</div>
                <div className="card-body">
                    <p className="card-text">Job Type: {this.props.jobInfo.job_type}</p>
                    <p className="card-text">Cost: ${this.props.jobInfo.cost}</p>
                    <p className="card-text">Additonal Info: {this.props.jobInfo.message}</p>
                </div>
          </div>

          <div className={this.state.editColor} style={{  minWidth: '15rem',  marginTop: '2rem' }}>
              <div className="card-header">Schedule (YYYY-MM-DD)</div>
                <div className="card-body">
                    <p className="card-text">Created date: {this.props.jobInfo.created_at.slice(0, -17)}</p>
                    <p className="card-text">Created by: {this.props.jobInfo.owner}</p>
                    <p className="card-text">Job Starts: {this.props.jobInfo.start_date.slice(0, -10)}</p>
                    <p className="card-text">Job Ends: {this.props.jobInfo.end_date.slice(0, -10)}</p>
                </div>
          </div>
      </div>
      )
    } else {
      cardPage = (
        <div className="card card-body mt-4 mb-4">
          
        <div className="float-right">
          <button type="button" className="close btn btn-danger" aria-label="Close" onClick={this.props.JobsPageHandler}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div className="btn-toolbar">
          <button className="btn btn-success ml-2" onClick={this.handleEditMode.bind(this)}>Edit mode</button>
        </div>
        <br></br>

        <form onSubmit={this.onSubmit}>
          <h3><label>Name</label>
            <input
              className="form-control"
              type="text"
              name="job_name"
              onChange={this.onChange}
              value={this.state.job_name}
            />
          </h3> 
        </form>

        <div className={this.state.editColor} style={{ minWidth: '15rem',  marginTop: '2rem' }}>
          <div className="card-header">Contact Info</div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <label>Business Name</label>
                  <input
                    className="form-control"
                    type="text"
                    name="client_business_name"
                    onChange={this.onChange}
                    value={this.state.client_business_name}
                  />

                <label>Contact Name</label>
                  <input
                    className="form-control"
                    type="text"
                    name="client_contact_name"
                    onChange={this.onChange}
                    value={this.state.client_contact_name}
                  />

                <label>Contact Email</label>
                  <input
                    className="form-control"
                    type="email"
                    name="client_contact_email"
                    onChange={this.onChange}
                    value={this.state.client_contact_email}
                  />
              </form>
            </div>
        </div>

        <div className={this.state.editColor} style={{ minWidth: '15rem',  marginTop: '2rem' }}>
          <div className="card-header">Contact Info</div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <label>Job Type</label>
                <select
                  className="form-control"
                  type="text"
                  name="job_type"
                  onChange={this.onChange}
                  value={this.state.job_type}
                >
                  <option defaultValue="Development">Development</option>
                  <option value="Research">Research</option>
                  <option value="Design">Design</option>
                  <option value="Quote">Quote</option>
                  <option value="Other">Other</option>
                </select>

                <label>Cost $</label>
                <input
                  className="form-control"
                  type="number"
                  name="cost"
                  onChange={this.onChange}
                  min="0.00"
                  max="100000.00"
                  step="0.01"
                  value={this.state.cost}
                />

                <label>Additional Info</label>
                <textarea
                  className="form-control"
                  type="text"
                  name="message"
                  onChange={this.onChange}
                  value={this.state.message}
                />
              </form>
            </div>
        </div>

        <div className={this.state.editColor} style={{ minWidth: '15rem',  marginTop: '2rem' }}>
          <div className="card-header">Contact Info</div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <label>Created at:</label>
                <input
                    className="form-control"
                    type="text"
                    readOnly={true}
                    value={this.props.jobInfo.created_at.slice(0, -17)}
                  />

                <label>Created by:</label>
                <input
                    className="form-control"
                    type="text"
                    readOnly={true}
                    value={this.props.jobInfo.owner}
                  />

                <label>Start Date:</label>
                  <input
                    className="form-control"
                    type="date"
                    name="start_date"
                    onChange={this.onChange}
                    value={this.state.start_date}
                  />

                <label>End Date:</label>
                  <input
                    className="form-control"
                    type="date"
                    name="end_date"
                    onChange={this.onChange}
                    value={this.state.end_date}
                  />
              </form>
            </div>
        </div>

        <form onSubmit={this.onSubmit}>
          <div className="btn-toolbar">
            <button className="btn btn-success ml-2" onClick={this.props.JobsPageHandler}>Cancel</button>
            <button type="submit" className="btn btn-success ml-2">Save</button>
          </div>
        </form>
      </div>
      )
    }

    return (
      <>
        <h2>Jobs Single</h2>

        {cardPage}
      </>
    )
  }
}

export default connect(null, { updateJob })(JobsSingle);
