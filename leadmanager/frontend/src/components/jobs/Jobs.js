import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getJobs, getAllJobs, deleteJob, deleteJobFromAll } from "../../actions/jobs";

import { getUsers } from "../../actions/users";

import Animation from '../animations/Animation'
import animationData from '../animations/bin.json'

import JobsSingle from './JobsSingle'

export class Jobs extends Component {
  state = {
    isStopped: true,
    loadSingle: false,
    jobData: ""
  }

  static propTypes = {
    jobs: PropTypes.array.isRequired,
    allJobs: PropTypes.array.isRequired,
    getJobs: PropTypes.func.isRequired,
    getAllJobs: PropTypes.func.isRequired,
    deleteJob: PropTypes.func.isRequired,
    getUsers: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.getJobs()
    this.props.getAllJobs()
    this.props.getUsers()
  }

  // Single page component handlering
  loadSingleJob = (job) => {
    this.setState({
      loadSingle: true,
      jobData: job
    })
  }

  onJobsPageHandler(){
    this.setState({
      loadSingle: false
    })
  }

  // animation button hovering effects
  onDeleteHover(){
    this.setState({
      isStopped: false
    })
  }

  onDeleteLeave(){
    this.setState({
      isStopped: true
    })
  }

  // returns the username of whoever created the Job
  getOwnerName(ID){
    for (let item in this.props.users){
      if (ID === this.props.users[item]["id"]) {
        return this.props.users[item]["username"]
      }
    }
    return "N/A"
  }
 

  onDeleteHandler(id){
    this.props.deleteJob(id)
    this.props.deleteJobFromAll(id)
  }

  // job table generation
  createJobTable(name, jobs){
    return (
      <>
      <h2>{name}</h2>
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
          { jobs.map(job => (

            <tr key={job.id}  style={{cursor: 'pointer'}}>
              <td onClick={this.loadSingleJob.bind(this, job)}>{job.id}</td>
              <td onClick={this.loadSingleJob.bind(this, job)}>{job.job_name}</td>
              <td onClick={this.loadSingleJob.bind(this, job)}>{job.job_type}</td>
              <td onClick={this.loadSingleJob.bind(this, job)}>{job.client_business_name}</td>
              <td onClick={this.loadSingleJob.bind(this, job)}>{this.getOwnerName(job.owner)}</td>
              <td onClick={this.loadSingleJob.bind(this, job)}>{job.start_date.slice(0, -10)}</td>
              <td onClick={this.loadSingleJob.bind(this, job)}>{job.end_date.slice(0, -10)}</td>
              <td onClick={this.loadSingleJob.bind(this, job)}>${job.cost}</td>
              <td>
                <div style={{ width: '3rem' }}>
                  <button 
                    className="btn btn-danger"
                    onClick={this.onDeleteHandler.bind(this, job.id)}
                    onMouseEnter={this.onDeleteHover.bind(this)}
                    onMouseLeave={this.onDeleteLeave.bind(this)}
                  >
                    <Animation animationItemData={animationData} stopped={this.state.isStopped} isLoop={false} name={job.id} />
                  </button>
                </div>
              </td>
            </tr>
          )) }
        </tbody>
      </table>
      </>
    )
  }

  render() {

    // loads the single web page when the state has changed from a click which passes in data from w/e table location it was in
    let singleJobWebPage
    if (this.state.loadSingle){
      singleJobWebPage = <JobsSingle jobInfo={this.state.jobData} JobsPageHandler={this.onJobsPageHandler.bind(this)}/>
    }

    return (
      <>
        {this.createJobTable("My Jobs", this.props.jobs)}
        {this.createJobTable("All Jobs", this.props.allJobs)}
        {singleJobWebPage}
      </>
    )
  }
}

const mapStateToProps = state => ({
  jobs: state.jobs.jobs,
  allJobs: state.jobs.allJobs,
  users: state.users.users
})

export default connect(mapStateToProps, { getJobs, getAllJobs, deleteJob, deleteJobFromAll, getUsers })(Jobs);
