import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getLeads, deleteLead, getAllLeads } from "../../actions/leads";

import { getUsers } from "../../actions/users";

import Animation from '../animations/Animation'
import animationData from '../animations/bin.json'

import LeadsSingle from './LeadsSingle'

// in order to get delete to work could have it as a nested object, isStopped: {lead1: true, lead2: false, lead3: true etc}
export class Leads extends Component {
  state = {
    isStopped: {1: true},
    loadSingle: false,
    leadData: ""
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

  // Single page component handlering
  loadSingleLead = (lead) => {
    this.setState({
      loadSingle: true,
      leadData: lead,
      ownerName: this.getOwnerName(lead.owner)
    })
  }
  
  // closes down the single page component
  onLeadsPageHandler = () => {
    this.setState({
      loadSingle: false
    })
  }

  onDeleteHover(lead, name){
    let leadName = name + lead
    // need to have the id decalared before setting the state as its changing an older vlaue
    let id = { [leadName]: false }

    let currentValue = this.state.isStopped
    this.setState({
      isStopped: {...currentValue, ...id}
    })
  }

  onDeleteLeave(lead, name){
    let leadName = name + lead
    // need to have the id decalared before setting the state as its changing an older vlaue
    let id = { [leadName]: true }

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

  // Creates the rows for the lead table due to being duplicate code, easier to have it as a function
  createLeadTableRows(lead, name){
    let leadName = name + lead.id
    return (
      <tr key={lead.id} style={{cursor: 'pointer'}}>
        <td onClick={this.loadSingleLead.bind(this, lead)}>{lead.id}</td>
        <td onClick={this.loadSingleLead.bind(this, lead)}>{lead.name}</td>
        <td onClick={this.loadSingleLead.bind(this, lead)}>{lead.email}</td>
        <td onClick={this.loadSingleLead.bind(this, lead)}>{lead.message}</td>
        <td onClick={this.loadSingleLead.bind(this, lead)}>{this.getOwnerName(lead.owner)}</td>
        <td onClick={this.loadSingleLead.bind(this, lead)}>{lead.active_lead.toString()}</td>
        <td>
          <div style={{ width: '3rem' }}>
            <button 
              onClick={this.props.deleteLead.bind(this, lead.id)} 
              className="btn btn-danger btn-sm"
              onMouseEnter={this.onDeleteHover.bind(this, lead.id, name)}
              onMouseLeave={this.onDeleteLeave.bind(this, lead.id, name)}
            >
              <Animation animationItemData={animationData} stopped={this.state.isStopped[leadName]} isLoop={false} />
            </button>
          </div>
        </td>
      </tr>
    )
  }

  // Lead table generation
  createLeadTable(name, leads){
    return (
      <>
        <h2>{name}</h2>
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
            { leads.map(lead => {
              if (this.props.loadActivity) {
                if (lead.active_lead) {
                  return (
                    this.createLeadTableRows(lead, name)
                  )
                }
              } else {
                return (
                  this.createLeadTableRows(lead, name)
                )
              }
            }) 
          }
          </tbody>
        </table>
      </>
    )
  }

  render() {
    return (
      <>
        {( this.props.myLeadsForm && this.createLeadTable("My Leads", this.props.leads) )}
        <br></br>

        {( this.props.allLeadsForm && this.createLeadTable("All Leads", this.props.allLeads)) }

        <br></br>
        {( this.state.loadSingle && <LeadsSingle
                                      leadInfo={this.state.leadData}
                                      LeadPageHandler={this.onLeadsPageHandler.bind(this)}
                                      CheckingState={this.state.loadSingle}
                                      OwnerName={this.state.ownerName} 
                                    /> )}
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
