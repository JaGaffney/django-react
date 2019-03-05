import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Calender from './Calender'

import Animation from '../animations/Animation'
import animationData from '../animations/spinner.json'

import { getJobs } from "../../actions/jobs";

export class Scheduler extends Component {
  state = {
    jobList: [],
    isLoading: true
  }

  static propTypes = {
    jobs: PropTypes.array.isRequired,
    getJobs: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.setState({ jobList: [] })
    this.props.getJobs() 

    // loads the eventCreator after a set ammount of time
    setTimeout(() => this.eventCreator(), 2000)
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
      jobList: eventList,
      isLoading: false
    })
  }

  render() {
    // either will have a spinner or have the schduler
    let scheduler
    if (this.state.isLoading){
      scheduler = (
        <div className="container h-30" style={{ height: '5rem', width: '5rem' }}>
          <div className="row h-100 justify-content-center align-items-center">
            <Animation animationItemData={animationData} stopped={false} isLoop={true} name={'spinner'} />
          </div>
        </div>
      )
    } else {
      scheduler = (
        <div style={{ height: '60rem' }}>
          <div className="container" style={{ height: '50rem' }}>
                <h1>Schedule Manager</h1>
                <br></br>
                <Calender eventList={this.state.jobList} />
          </div>
        </div>
      )
    }

    return (
      <>
        {scheduler}
      </>
    )
  }
}

const mapStateToProps = state => ({
  jobs: state.jobs.jobs
})

export default connect(mapStateToProps, { getJobs })(Scheduler);