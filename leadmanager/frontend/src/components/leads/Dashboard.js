import React, { Component } from 'react'

import Form from './Form'
import Leads from './Leads'

import Backdrop from '../layout/Backdrop'

export class Dashboard extends Component {
  state = {
    loadForm: false,
    loadActivity: true,
    allLeadsForm: true,
    myLeadsForm: false
  }

  // switches between states for show/add form button
  onFormHandler(){
    this.setState(prevState => {
      const updatedState = prevState
      return {loadForm: !updatedState.loadForm}
    })
  }

  // switches the state to display all leads in the table
  onAllLeadsHandler(){
    this.setState(prevState => {
      const updatedState = prevState
      return {allLeadsForm: !updatedState.allLeadsForm} 
    })
  }

  // switches the state to display only your own leads in the table
  onMyLeadsHandler(){
    this.setState(prevState => {
      const updatedState = prevState
      return {myLeadsForm: !updatedState.myLeadsForm} 
    })
  }

  // switches the state to display if active leads should be displayed or not in the table
  onActivityHandler(){
    this.setState(prevState => {
      const updatedState = prevState
      return {loadActivity: !updatedState.loadActivity}     
    })
  }

  render() {
    
    return (
      <>
      <br></br>       
      <div className="container h-100">
        <div className="row h-100 justify-content-center align-items-center">
          <div className="btn-group" role="group" aria-label="Options">
            <button className="btn btn-primary" autoFocus={true} onClick={this.onAllLeadsHandler.bind(this)}>{this.state.allLeadsForm ? 'Hide' : 'Show'} All Leads</button>
            <button className="btn btn-primary" onClick={this.onMyLeadsHandler.bind(this)}>{this.state.myLeadsForm ? 'Hide' : 'Show'} My Leads</button>
            <button className="btn btn-primary" onClick={this.onActivityHandler.bind(this)}>{this.state.loadActivity ? 'Show' : 'Hide'} inactive</button>
            {/* <button className="btn btn-primary">Edit Leads</button> */}
            <button className="btn btn-primary" onClick={this.onFormHandler.bind(this)}>{this.state.loadForm ? 'Hide' : 'Add'} new Lead</button>
          </div>
        </div>
      </div>

      <br></br>
      {( this.state.loadForm && <Backdrop /> )}  
      {( this.state.loadForm && <Form  onFormHandler={this.onFormHandler.bind(this)}/> )}
      
      <br></br>  
      <Leads loadActivity={this.state.loadActivity} allLeadsForm={this.state.allLeadsForm} myLeadsForm={this.state.myLeadsForm} />


      
    </>
    )
  }
}

export default Dashboard

