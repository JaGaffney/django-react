import React, { Component } from "react";

export class JobsSingle extends Component {

  render() {
    return (
      <>
        <h2>Jobs Single</h2>
        <div className="card card-body mt-4 mb-4">
        
          <div className="float-right">
            <button type="button" className="close btn btn-warning" aria-label="Close" onClick={this.props.JobsPageHandler}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <h3>Name: {this.props.jobInfo.job_name} ID: {this.props.jobInfo.id}</h3> 
 

            <div className="card text-white bg-primary mb-3" style={{ minWidth: '15rem',  marginTop: '2rem' }}>
                <div className="card-header">Contact Info</div>
                  <div className="card-body">
                      <p className="card-text">Business Name: {this.props.jobInfo.client_business_name}</p>
                      <p className="card-text">Contact Name: {this.props.jobInfo.client_contact_name}</p>
                      <p className="card-text">Contact Email: {this.props.jobInfo.client_contact_email}</p>
                  </div>
            </div>

            <div className="card text-white bg-primary mb-3" style={{ minWidth: '15rem',  marginTop: '2rem' }}>
                <div className="card-header">Job Info</div>
                  <div className="card-body">
                      <p className="card-text">Job Type: {this.props.jobInfo.job_type}</p>
                      <p className="card-text">Cost: ${this.props.jobInfo.cost}</p>
                      <p className="card-text">Additonal Info: {this.props.jobInfo.message}</p>
                  </div>
            </div>

            <div className="card text-white bg-primary mb-3" style={{  minWidth: '15rem',  marginTop: '2rem' }}>
                <div className="card-header">Schedule (YYYY-MM-DD)</div>
                  <div className="card-body">
                      <p className="card-text">Created date: {this.props.jobInfo.created_at.slice(0, -17)}</p>
                      <p className="card-text">Created by: {this.props.jobInfo.owner}</p>
                      <p className="card-text">Job Starts: {this.props.jobInfo.start_date.slice(0, -10)}</p>
                      <p className="card-text">Job Ends: {this.props.jobInfo.end_date.slice(0, -10)}</p>
                  </div>
            </div>
        </div>
      </>
    )
  }
}

export default JobsSingle;
