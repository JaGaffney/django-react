import React, { Component } from 'react'
import Form from './Form'
import Leads from './Leads'

export class Dashboard extends Component {
  state = {
    loadForm: false,
    loadActivity: false
  }

  // switches between states for show/add form button
  onFormHandler(){
    this.setState(prevState => {
      const updatedState = prevState
      return {loadForm: !updatedState.loadForm}
    })
  }

  onActivityHandler(){
    this.setState(prevState => {
      const updatedState = prevState
      return {loadActivity: !updatedState.loadActivity}     
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
          <div className="row h-100 justify-content-end align-items-right">
            <button className="btn btn-primary" onClick={this.onActivityHandler.bind(this)}>{this.state.loadActivity ? 'Hide' : 'Show'} Active</button>
          </div>
      </div>

      <br></br>  
      <Leads loadActivity={this.state.loadActivity} />

      <br></br>
        <div className="container h-100">
          <div className="row h-100 justify-content-center align-items-center">
            <button className="btn btn-primary" onClick={this.onFormHandler.bind(this)}>{this.state.loadForm ? 'Hide' : 'Add'} new Lead</button>
          </div>
        </div>
        {formPage}
      
    </>
    )
  }
}

export default Dashboard

