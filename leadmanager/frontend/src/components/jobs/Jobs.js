import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getJobs, getAllJobs, deleteJob } from "../../actions/jobs";

import { getUsers } from "../../actions/users";

import Animation from '../animations/Animation'
import animationData from '../animations/bin.json'

import JobsSingle from './JobsSingle'

export class Jobs extends Component {
  state = {
    isStopped: true,
    loadSingle: false,
    jobData: "",
    ownerName: ""
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
      jobData: job,
      ownerName: this.getOwnerName(job.owner)
    })
  }

  // closes down the single page component
  onJobsPageHandler = () => {
    this.setState({
      loadSingle: false
    })
  }

  // animation button hovering effects
  onDeleteHover(job, name){
    let jobName = name + job
    // need to have the id decalared before setting the state as its changing an older vlaue
    let id = { [jobName]: false }

    let currentValue = this.state.isStopped
    this.setState({
      isStopped: {...currentValue, ...id}
    })
  }

  onDeleteLeave(job, name){
    let jobName = name + job
    // need to have the id decalared before setting the state as its changing an older vlaue
    let id = { [jobName]: true }

    let currentValue = this.state.isStopped
      this.setState({
        isStopped: {...currentValue, ...id}
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
  }

  // need to seperate from main table creation
  createJobTableRows(job, name){
    let jobName = name + job.id
    return (
      <tr key={job.id} style={{cursor: 'pointer'}}>
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
              onMouseEnter={this.onDeleteHover.bind(this, job.id, name)}
              onMouseLeave={this.onDeleteLeave.bind(this, job.id, name)}
            >
              <Animation animationItemData={animationData} stopped={this.state.isStopped[jobName]} isLoop={false} name={job.id} />
            </button>
          </div>
        </td>
      </tr>
    )
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
              this.createJobTableRows(job, name)
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
      // updates table information with the new data from the db
      singleJobWebPage = <JobsSingle
                            jobInfo={this.state.jobData}
                            JobsPageHandler={this.onJobsPageHandler.bind(this)}
                            CheckingState={this.state.loadSingle}
                            OwnerName={this.state.ownerName} 
                          />
    } 

    // determines of the all/my jobs tables should be displayed based on the state passed down from the JobsDashboard
    let myJobsPage
    if (this.props.myJobsForm){
      myJobsPage = this.createJobTable("My Jobs", this.props.jobs)
    } 

    let allJobsPage
    if (this.props.allJobsForm){
      allJobsPage = this.createJobTable("All Jobs", this.props.allJobs)
    }

    return (
      <>
        {myJobsPage}
        <br></br>
        {allJobsPage}
        <br></br>
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

export default connect(mapStateToProps, { getJobs, getAllJobs, deleteJob, getUsers })(Jobs);
