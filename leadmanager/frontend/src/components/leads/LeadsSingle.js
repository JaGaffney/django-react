import React, { Component } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateLead } from "../../actions/leads";

export class LeadsSingle extends Component {
  state = {
    editMode: false,
    editColorPrimary: "card text-white mb-3 bg-primary",
    editColorSuccess: "card text-white mb-3 bg-success",
    editColor: "",
    name: "",
    email: "",
    message: "",
    owner: "",
    active_lead: "",
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
      name: this.props.leadInfo.name,
      email: this.props.leadInfo.email,
      message: this.props.leadInfo.message,
      owner: this.props.leadInfo.owner,
      active_lead: this.props.leadInfo.active_lead
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
    let { name, email, message, owner, active_lead } = this.state
 
    // creates a valid object that can be sent to the API
    const lead = { id: this.props.leadInfo.id, created_at: this.props.leadInfo.created_at, name, email, message, owner, active_lead }
    this.props.updateLead(this.props.leadInfo.id, lead)
    
    // resetting data back to default values
    this.setState({
      name: "",
      email: "",
      message: "",
      owner: "",
      active_lead: "",
      editMode: false,
      editColor: this.state.editColorPrimary
    })

    // closes down the form, ensures data that might not have made it to the server isnt overrwitten by closing down on change.
    this.props.LeadPageHandler()
  }

  render() {
    // dynamic rendering depeding on if edit mode is enabled or not
    let cardPage
    if (!this.state.editMode) {
      cardPage = (
        <div className="card card-body mt-4 mb-4">
          
        <div className="float-right">
          <button type="button" className="close btn btn-danger" aria-label="Close" onClick={this.props.LeadPageHandler}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <h2>Leads Details</h2>
        <br></br>

        <div className="btn-toolbar">
          <button className="btn btn-success ml-2" onClick={this.handleEditMode.bind(this)}>Edit mode</button>
        </div>
        <br></br>

        <h3>Name: {this.props.leadInfo.name}</h3> 
        <h3>ID: {this.props.leadInfo.id}</h3> 
        <h3>Active: {this.props.leadInfo.active_lead.toString()}</h3> 

          <div className={this.state.editColor} style={{ minWidth: '15rem',  marginTop: '2rem' }}>
              <div className="card-header">Contact Info</div>
                <div className="card-body">
                    <p className="card-text">Email: {this.props.leadInfo.email}</p>
                    <p className="card-text">Owner: {this.props.OwnerName}</p>
                    <p className="card-text">Created at: {this.props.leadInfo.created_at.slice(0, -17)}</p>
                    <p className="card-text">Message: {this.props.leadInfo.message}</p>
                </div>
          </div>
      </div>
      )
    } else {
      cardPage = (
        <div className="card card-body mt-4 mb-4">
          
        <div className="float-right">
          <button type="button" className="close btn btn-danger" aria-label="Close" onClick={this.props.LeadPageHandler}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <h2>Leads Details</h2>
        <br></br>

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
              value={this.state.name}
            />
          </h3> 
        </form>
        
        <form onSubmit={this.onSubmit}>
          <h3><label>Active lead</label>
            <select
              className="form-control"
              type="text"
              name="active_lead"
              onChange={this.onChange}
              value={this.state.active_lead}
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </h3>
        </form>

        <div className={this.state.editColor} style={{ minWidth: '15rem',  marginTop: '2rem' }}>
          <div className="card-header">Contact Info</div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <label>Email</label>
                  <input
                    className="form-control"
                    type="text"
                    name="email"
                    onChange={this.onChange}
                    value={this.state.email}
                  />

                <label>Owner</label>
                  <input
                    className="form-control"
                    type="text"
                    name="owner"
                    readOnly={true}
                    value={this.props.OwnerName}
                  />

                <label>Created at:</label>
                  <input
                    className="form-control"
                    type="text"
                    readOnly={true}
                    value={this.props.leadInfo.created_at.slice(0, -17)}
                  />

                <label>Message</label>
                  <input
                    className="form-control"
                    type="email"
                    name="message"
                    onChange={this.onChange}
                    value={this.state.message}
                  />

              </form>
            </div>
        </div>

        <form onSubmit={this.onSubmit}>
          <div className="btn-toolbar">
            <button className="btn btn-success ml-2" onClick={this.props.LeadsPageHandler}>Cancel</button>
            <button type="submit" className="btn btn-success ml-2">Save</button>
          </div>
        </form>
      </div>
      )
    }

    return (
      <>
        {cardPage}
      </>
    )
  }
}

LeadsSingle.propTypes = {
  CheckingState: PropTypes.bool,
  LeadPageHandler: PropTypes.func,
  OwnerName: PropTypes.string,
  leadInfo: PropTypes.object,
  updateLead: PropTypes.func.isRequired,
}


export default connect(null, { updateLead })(LeadsSingle);
