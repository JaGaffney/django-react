import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Calender from './Calender'

import { getJobs } from "../../actions/jobs";

// NOTE: TODO eventCreator should be called on load rather than from an onClick button
export class Scheduler extends Component {
  state = {
    jobList: []
  }

  static propTypes = {
    jobs: PropTypes.array.isRequired,
    getJobs: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.getJobs()  
  }

  // converts jobs from API to calander readable format
  eventCreator = () => {
    // creates empty list to store API data
    let eventList = []

    // processes the data from getJobs
    for (let items in this.props.jobs){
      let startDate = this.props.jobs[items]['start_date'].slice(0, -10).split('-').join()
      let endDate = this.props.jobs[items]['end_date'].slice(0, -10).split('-').join()
      let tempEventObject = {
        id: this.props.jobs[items]['id'],
        title: this.props.jobs[items]['job_name'],
        allDay: true,
        start: new Date(startDate),
        end: new Date(endDate)
      }
      eventList = [...eventList, tempEventObject]
    }

    // sets the states
    this.setState({
      jobList: eventList
    })
  }

// need to have the states load pre render but after the data has been loaded
  render() {

    return (
      <div style={{ height: '60rem' }}>
        <div className="container" style={{ height: '50rem' }}>
              <h1>Schedule Manager</h1>
              <button className ="btn btn-primary" onClick={this.eventCreator}>Refresh(temp)</button> 
              <br></br>
              <br></br>
              <Calender eventList={this.state.jobList} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  jobs: state.jobs.jobs
})

export default connect(mapStateToProps, { getJobs })(Scheduler);