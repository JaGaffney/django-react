import React, { Component } from 'react'
import Form from './Form'
import Leads from './Leads'

export class Dashboard extends Component {
  state = {
    loadForm: false
  }

  onFormHandler(){
    this.setState(prevState => {
      const updatedState = prevState
      return {loadForm: !updatedState.loadForm}
      
    })
  }

  render() {

    let formPage 
    if (this.state.loadForm){
      formPage = <Form />
    } else {
      formPage
    }
    
    return (
      <>
      <br></br>
      <Leads />
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

