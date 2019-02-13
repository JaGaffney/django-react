import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getLeads, deleteLead } from "../../actions/leads";

import Animation from '../jobs/Animation'

export class Leads extends Component {
  state = {
    isStopped: false,
    isLooped: false
  }

  static propTypes = {
    leads: PropTypes.array.isRequired,
    getLeads: PropTypes.func.isRequired,
    deleteLead: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.getLeads();
  }

  onDeleteHover(){
    this.setState({
      isStopped: true,
      isLooped: true
    })
  }

  onDeleteLeave(){
    this.setState({
      isStopped: false,
      isLooped: false
    })
  }

  render() {
    let animationItem = <Animation stopped={this.state.isStopped} isLoop={this.state.isLooped} />

    return (
      <>
        <h2>Leads</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
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
                <td>
                 <div style={{ width: '3rem', height: '3rem' }}>
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
  leads: state.leads.leads
})

export default connect(
  mapStateToProps,
  { getLeads, deleteLead }
)(Leads);
