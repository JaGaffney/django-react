import React, { Component } from 'react'

import Form from './Form'
import Jobs from './Jobs'

export class JobsDashboard extends Component {
  state = {
    loadForm: false,
    allJobsForm: true,
    myJobsForm: false
  }

  // switches between states for show/add form button
  onFormHandler(){
    this.setState(prevState => {
      const updatedState = prevState
      return {loadForm: !updatedState.loadForm} 
    })
  }

  // switches the state to display all jobs in the table
  onAllJobsHandler(){
    this.setState(prevState => {
      const updatedState = prevState
      return {allJobsForm: !updatedState.allJobsForm} 
    })
  }

  // switches the state to display only your own jobs in the table
  onMyJobsHandler(){
    this.setState(prevState => {
      const updatedState = prevState
      return {myJobsForm: !updatedState.myJobsForm} 
    })
  }

  render() {

    // loads the form when the button is clicked
    let formPage 
    if (this.state.loadForm){
      formPage = <Form />
    } else {
      formPage
    }

    return (
      <>
      <br></br>
      <div className="container h-100">
          <div className="row h-100 justify-content-center align-items-center">
            <div className="btn-group" role="group" aria-label="Options">
              <button className="btn btn-primary" autoFocus={true} onClick={this.onAllJobsHandler.bind(this)}>{this.state.allJobsForm ? 'Hide' : 'Show'} All Jobs</button>
              <button className="btn btn-primary" onClick={this.onMyJobsHandler.bind(this)}>{this.state.myJobsForm ? 'Hide' : 'Show'} My Jobs</button>
              {/* <button className="btn btn-primary">Edit Jobs</button> */}

              <button className="btn btn-primary" onClick={this.onFormHandler.bind(this)}>{this.state.loadForm ? 'Hide' : 'Add'} new Job</button>
            </div>
          </div>
      </div>

      <Jobs allJobsForm={this.state.allJobsForm} myJobsForm={this.state.myJobsForm}/>

        {formPage}
      </>
    )
  }
}

export default JobsDashboard

