import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getLeads, deleteLead, getAllLeads } from "../../actions/leads";

import { getUsers } from "../../actions/users";

import Animation from '../animations/Animation'
import animationData from '../animations/bin.json'

export class Leads extends Component {
  state = {
    isStopped: true
  }

  static propTypes = {
    leads: PropTypes.array.isRequired,
    allLeads: PropTypes.array.isRequired,
    getLeads: PropTypes.func.isRequired,
    getAllLeads: PropTypes.func.isRequired,
    deleteLead: PropTypes.func.isRequired,
    getUsers: PropTypes.func.isRequired
  }

  // onload gets all of the leads data from the api
  componentDidMount() {
    this.props.getLeads()
    this.props.getAllLeads()
    this.props.getUsers()
  }

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

  render() {
    // loads the lottie animation
    let animationItem = <Animation animationItemData={animationData} stopped={this.state.isStopped} isLoop={false} />

    return (
      <>
        <h2>My Leads</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Active</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { this.props.leads.map(lead => (
              <tr key={lead.id}>
                <td>{lead.id}</td>
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.message}</td>
                <td>{lead.active_lead.toString()}</td>
                <td>
                <div style={{ width: '3rem' }}>
                    <button 
                      onClick={this.props.deleteLead.bind(this, lead.id)} 
                      className="btn btn-danger btn-sm"
                      onMouseEnter={this.onDeleteHover.bind(this)}
                      onMouseLeave={this.onDeleteLeave.bind(this)}
                    >
                      {animationItem}
                    </button>
                  </div>
                </td>
              </tr> 
             )) 
            }
          </tbody>
        </table>

        <br></br>

        <h2>All Leads</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Lead creator</th>
              <th>Active</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { this.props.allLeads.map(lead => (
              <tr key={lead.id}>
                <td>{lead.id}</td>
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.message}</td>
                <td>{this.getOwnerName(lead.owner)}</td>
                <td>{lead.active_lead.toString()}</td>
                <td>
                 <div style={{ width: '3rem' }}>
                    <button 
                      onClick={this.props.deleteLead.bind(this, lead.id)} 
                      className="btn btn-danger btn-sm"
                      onMouseEnter={this.onDeleteHover.bind(this)}
                      onMouseLeave={this.onDeleteLeave.bind(this)}
                    >
                      {animationItem}
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
}

const mapStateToProps = state => ({
  leads: state.leads.leads,
  allLeads: state.leads.allLeads,
  users: state.users.users
})

export default connect(mapStateToProps,{ getLeads, deleteLead, getAllLeads, getUsers })(Leads);
