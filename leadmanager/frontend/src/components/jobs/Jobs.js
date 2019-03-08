import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withGetScreen } from 'react-getscreen'
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
  createJobTable(name, jobs, tableSizeType){
    return (
      <>
      <h2>{name}</h2>
      <table className={tableSizeType}>
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

  createJobTableMobile(name, jobs){
    return (
      <>
      <h2>{name}</h2>
        { jobs.map(job => (
            this.createJobTableMobileRows(name, job)
        )) }
      </>
    )
  }

  // need to seperate from main table creation
  createJobTableMobileRows(name, job){
    let jobName = name + job.id
    return (
      <table className="table table-striped text-center"  key={job.id}>

        <thead>
          <tr className="bg-primary" key={job.id + job.job_name}>
            <th>
              <div style={{ clear: "both" }}>
                <p style={{ float: "left" }}>ID: {job.id}</p>
                <p style={{ float: "right", width: '50%' }}>Job Name: {job.job_name}</p>
              </div> 
            </th>
          </tr>
        </thead>

        <tbody>
          <tr key={job.id + job.job_type} style={{cursor: 'pointer'}}>
            <td onClick={this.loadSingleJob.bind(this, job)}>
              <p><strong>Job Type</strong></p>
              <p>{job.job_type}</p>
            </td>
          </tr>

          <tr key={job.id + job.client_business_name}>
            <td onClick={this.loadSingleJob.bind(this, job)}>
              <p><strong>Business Name</strong></p>
              <p>{job.client_business_name}</p>
            </td> 
          </tr>

          <tr key={job.id + job.owner}>
            <td onClick={this.loadSingleJob.bind(this, job)}>
              <p><strong>Lead creator</strong></p>
              <p>{this.getOwnerName(job.owner)}</p>
            </td>
          </tr>

          <tr key={job.id + job.start_date}>
            <td onClick={this.loadSingleJob.bind(this, job)}>
              {job.start_date.slice(0, -10)} /
              {job.end_date.slice(0, -10)}
            </td>
          </tr>

          <tr key={job.id + job.cost}>
            <td onClick={this.loadSingleJob.bind(this, job)}>
              <p><strong>Cost</strong></p>
              <p>${job.cost}</p>
            </td>
          </tr>

          <tr key={job.id + 'delete'} >
            <td style={{ paddingLeft: '43%' }}>
              <div style={{ width: '3rem' }} >
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

        </tbody>
      </table>
    )
  }

  render() {
    // conditional rendering replacing older rendering way
    let mobileView
    if (this.props.isMobile() && !this.props.isTablet()) mobileView = (
      <>
      {( this.props.myJobsForm && this.createJobTableMobile("My Jobs", this.props.jobs) )}
      <br></br>

      {( this.props.allJobsForm && this.createJobTableMobile("All Jobs", this.props.allJobs) )}
      <br></br>
      </>
    );

    let tabletView
    if (this.props.isTablet() && !this.props.isMobile()) tabletView = (
      <>
      {( this.props.myJobsForm && this.createJobTable("My Jobs", this.props.jobs, "table-sm table-striped table-bordered ") )}
      <br></br>

      {( this.props.allJobsForm && this.createJobTable("All Jobs", this.props.allJobs, "table-sm table-striped table-bordered ") )}
      <br></br>
      </>
    )

    let deskTopView
    if (!this.props.isMobile() && !this.props.isTablet()) deskTopView = (
      <>
      {( this.props.myJobsForm && this.createJobTable("My Jobs", this.props.jobs, "table table-striped") )}
      <br></br>

      {( this.props.allJobsForm && this.createJobTable("All Jobs", this.props.allJobs, "table table-striped") )}
      <br></br>
      </>
    )

    return (
      <>
        {(this.state.modal && <Backdrop />)}
        {(this.state.modal && <Modal
                                onCancel={this.modalCancelHandler}
                                onConfirm={this.modalDeleteHandler}
                                deleteJobData={this.state.deleteJobData}
                                ownerName={this.state.ownerName} 
                              />)}

        {mobileView}
        {tabletView}
        {deskTopView}

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

export default withGetScreen(connect(mapStateToProps, { getJobs, getAllJobs, deleteJob, getUsers })(Jobs));
