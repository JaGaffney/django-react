import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getJobs, deleteJob } from "../../actions/jobs";

import JobsSingle from './JobsSingle'



export class Jobs extends Component {
  static propTypes = {
    jobs: PropTypes.array.isRequired,
    getJobs: PropTypes.func.isRequired,
    deleteJob: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.getJobs();
  }

  loadSingleJob(job) {
    //console.log(job)
    console.log("hello, you shouldn't be here")
    //<JobsSingle singleJob={job} />
  }

  render() {
    return (
      <>
        <h2>Jobs</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Job Name</th>
              <th>Job Type</th>
              <th>Business Name</th>
              <th>Lead creator</th>
              <th>Start date</th>
              <th>End date</th>
              <th>Cost</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            { this.props.jobs.map(job => (

              <tr key={job.id} onClick={this.loadSingleJob.bind(this, job)}>
                <td>{job.id}</td>
                <td>{job.job_name}</td>
                <td>{job.job_type}</td>
                <td>{job.client_business_name}</td>
                <td>{job.owner}</td>
                <td>{job.start_date.slice(0, -10)}</td>
                <td>{job.end_date.slice(0, -10)}</td>
                <td>${job.cost}</td>
                <td>
                    <button 
                      className="btn btn-danger btn-sm"
                      onClick={this.props.deleteJob.bind(this, job.id)}
                    >
                      {" "}
                      Delete
                    </button>
                </td>
              </tr>
            )) }
          </tbody>
        
        </table>
      </>
    )
  }
}

const mapStateToProps = state => ({
  jobs: state.jobs.jobs
})

export default connect(mapStateToProps, { getJobs, deleteJob })(Jobs);
