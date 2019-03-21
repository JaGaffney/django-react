import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withGetScreen } from 'react-getscreen'
import { getLeads, deleteLead, getAllLeads } from "../../actions/leads";

import { getUsers } from "../../actions/users";

import Animation from '../animations/Animation'
import animationData from '../animations/bin.json'

import Modal from '../layout/Modal'
import Backdrop from '../layout/Backdrop'

import LeadsSingle from './LeadsSingle'

// in order to get delete to work could have it as a nested object, isStopped: {lead1: true, lead2: false, lead3: true etc}
export class Leads extends Component {
  state = {
    isStopped: {1: true},
    loadSingle: false,
    leadData: "",
    modal: false,
    deleteLeadData: "",
    ownerName: ""
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
  
  // sets the state of the Modal to be displayed as well as setting basic data propeties of the job
  onDeleteHandlerModal = (lead) => {
    this.setState({
      modal: true,
      deleteLeadData: lead,
      ownerName: this.getOwnerName(lead.owner)
    })
  }

  // if the modal is canceled or closed
  modalCancelHandler = () => {
    this.setState({
      modal: false, 
      deleteLeadData: "",
      ownerName: ""
    })
  }

  // if the modal is confiemd the data is deleted
  modalDeleteHandler = () => {
    this.setState({
      modal: false, 
      deleteLeadData: "",
      ownerName: ""
    })

    this.props.deleteLead(this.state.deleteLeadData.id)
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
              onClick={this.onDeleteHandlerModal.bind(this, lead)} 
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
  createLeadTable(name, leads, tableSizeType){
    return (
      <>
        <h2>{name}</h2>
        <table className={tableSizeType}>
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

  createLeadTableMobile(name, leads){
    return (
      <>
      <h2>{name}</h2>
        { leads.map(lead => {
          if (this.props.loadActivity) {
            if (lead.active_lead) {
              return (
                this.createLeadTableMobileRows(lead, name)
              )
            }
          } else {
            return (
              this.createLeadTableMobileRows(lead, name)
            )
          }
        }
        ) }
      </>
    )
  }

  // need to seperate from main table creation
  createLeadTableMobileRows(lead, name){
    let leadName = name + lead.id
    return (
      <table className="table table-striped text-center"  key={lead.id}>

        <thead>
          <tr className="bg-primary" key={lead.id + lead.name}>
            <th>
              <div style={{ clear: "both" }}>
                <p style={{ float: "left" }}>ID: {lead.id}</p>
                <p style={{ float: "right", width: '50%' }}>Lead Name: {lead.name}</p>
              </div> 
            </th>
          </tr>
        </thead>

        <tbody>
          <tr key={lead.id + lead.email} style={{cursor: 'pointer'}}>
            <td onClick={this.loadSingleLead.bind(this, lead)}>
              <p><strong>Email</strong></p>
              <p>{lead.email}</p>
            </td>
          </tr>

          <tr key={lead.id + lead.message}>
            <td onClick={this.loadSingleLead.bind(this, lead)}>
              <p><strong>Message</strong></p>
              <p>{lead.message}</p>
            </td> 
          </tr>

          <tr key={lead.id + lead.owner}>
            <td onClick={this.loadSingleLead.bind(this, lead)}>
              <p><strong>Lead creator</strong></p>
              <p>{this.getOwnerName(lead.owner)}</p>
            </td>
          </tr>

          <tr key={lead.id + 'active'}>
            <td onClick={this.loadSingleLead.bind(this, lead)}>
              <p><strong>Active</strong></p>
              <p>{lead.active_lead.toString()}</p>
            </td>
          </tr>

          <tr key={lead.id + 'delete'} >
            <td style={{ paddingLeft: '43%' }}>
              <div style={{ width: '3rem' }} >
                <button 
                  onClick={this.onDeleteHandlerModal.bind(this, lead)} 
                  className="btn btn-danger btn-sm"
                  onMouseEnter={this.onDeleteHover.bind(this, lead.id, name)}
                  onMouseLeave={this.onDeleteLeave.bind(this, lead.id, name)}
                >
                <Animation animationItemData={animationData} stopped={this.state.isStopped[leadName]} isLoop={false} />
              </button>
              </div>
            </td>
          </tr>

        </tbody>
      </table>
    )
  }

  render() {

    let mobileView
    if (this.props.isMobile() && !this.props.isTablet()) mobileView = (
      <>
      {( this.props.myLeadsForm && this.createLeadTableMobile("My Leads", this.props.leads) )}
      <br></br>

      {( this.props.allLeadsForm && this.createLeadTableMobile("All Leads", this.props.allLeads) )}
      <br></br>
      </>
    )

    let tabletView
    if (this.props.isTablet() && !this.props.isMobile()) tabletView = (
      <>
      {( this.props.myLeadsForm && this.createLeadTable("My Leads", this.props.leads, "table-sm table-striped table-bordered") )}
      <br></br>

      {( this.props.allLeadsForm && this.createLeadTable("All Leads", this.props.allLeads, "table-sm table-striped table-bordered") )}
      <br></br>
      </>
    )

    let deskTopView
    if (!this.props.isMobile() && !this.props.isTablet()) deskTopView = (
      <>
      {( this.props.myLeadsForm && this.createLeadTable("My Leads", this.props.leads, "table table-striped") )}
      <br></br>

      {( this.props.allLeadsForm && this.createLeadTable("All Leads", this.props.allLeads, "table table-striped") )}
      <br></br>
      </>
    )

    return (
      <>
        {(this.state.modal && <Backdrop />)}
        {(this.state.modal && <Modal
                                onCancel={this.modalCancelHandler}
                                onConfirm={this.modalDeleteHandler}
                                deleteLeadData={this.state.deleteLeadData}
                                ownerName={this.state.ownerName} 
                                modalType={"lead"} 
                              />)}

        {(this.state.loadSingle && <Backdrop />)}
        {( this.state.loadSingle && <LeadsSingle
                                      leadInfo={this.state.leadData}
                                      LeadPageHandler={this.onLeadsPageHandler.bind(this)}
                                      CheckingState={this.state.loadSingle}
                                      OwnerName={this.state.ownerName} 
                                    /> )}

        <br></br>
        {mobileView}
        {tabletView}
        {deskTopView}

        <br></br>

      </>
    )
  }
}

const mapStateToProps = state => ({
  leads: state.leads.leads,
  allLeads: state.leads.allLeads,
  users: state.users.users
})


Leads.propTypes = {
  leads: PropTypes.array.isRequired,
  allLeads: PropTypes.array.isRequired,
  getLeads: PropTypes.func.isRequired,
  getAllLeads: PropTypes.func.isRequired,
  deleteLead: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  allLeadsForm: PropTypes.bool,
  isDesktop: PropTypes.func,
  isMobile: PropTypes.func,
  isTablet: PropTypes.func,
  loadActivity: PropTypes.bool,
  myLeadsForm: PropTypes.bool,
  users: PropTypes.array,
}

export default withGetScreen(connect(mapStateToProps,{ getLeads, deleteLead, getAllLeads, getUsers })(Leads));
