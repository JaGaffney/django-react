import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getJobs, getAllJobs, deleteJob } from "../../actions/jobs";

import { getUsers } from "../../actions/users";

import Animation from '../animations/Animation'
import animationData from '../animations/bin.json'

import Modal from '../layout/Modal'
import Backdrop from '../layout/Backdrop'

import JobsSingle from './JobsSingle'

export class Jobs extends Component {
  state = {
    isStopped: true,
    loadSingle: false,
    jobData: "",
    ownerName: "",
    modal: false,
    deleteJobData: false,
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
 
  // sets the state of the Modal to be displayed as well as setting basic data propeties of the job
  onDeleteHandlerModal = (job) => {
    this.setState({
      modal: true,
      deleteJobData: job,
      ownerName: this.getOwnerName(job.owner)
    })
  }

  // if the modal is canceled or closed
  modalCancelHandler = () => {
    this.setState({
      modal: false, 
      deleteJobData: "",
      ownerName: ""
    })
  }

  // if the modal is confiemd the data is deleted
  modalDeleteHandler = () => {
    this.setState({
      modal: false, 
      deleteJobData: "",
      ownerName: ""
    })

    this.props.deleteJob(this.state.deleteJobData.id)
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
              onClick={this.onDeleteHandlerModal.bind(this, job)}
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
    // conditional rendering replacing older rendering way
    return (
      <>
        {(this.state.modal && <Backdrop />)}
        {(this.state.modal && <Modal
                                onCancel={this.modalCancelHandler}
                                onConfirm={this.modalDeleteHandler}
                                deleteJobData={this.state.deleteJobData}
                                ownerName={this.state.ownerName} 
                              />)}

        {( this.props.myJobsForm && this.createJobTable("My Jobs", this.props.jobs) )}  
        <br></br>

        {(this.props.allJobsForm && this.createJobTable("All Jobs", this.props.allJobs))}
        <br></br>

        {(this.state.loadSingle && <JobsSingle
                            jobInfo={this.state.jobData}
                            JobsPageHandler={this.onJobsPageHandler.bind(this)}
                            CheckingState={this.state.loadSingle}
                            OwnerName={this.state.ownerName} 
                          />)}
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
