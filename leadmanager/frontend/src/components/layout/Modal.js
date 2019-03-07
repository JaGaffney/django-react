import React, { Component } from 'react'

export class Modal extends Component {

  render() {

    return (
        <>
        <div className="modal-open" id="exampleModal">
            <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title">Are you sure you want to delete this Job?</h5>
                <button type="button" className="close" aria-label="Close" data-dismiss="modal" onClick={this.props.onCancel}>
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div className="modal-body">
                <p>Job Name: <strong className="text-danger">{this.props.deleteJobData.job_name}</strong></p>
                <p>Job Type: <strong className="text-danger">{this.props.deleteJobData.job_type}</strong></p>
                <p>Business Name: <strong className="text-danger">{this.props.deleteJobData.client_business_name}</strong></p>
                <p>Contact Name: <strong className="text-danger">{this.props.deleteJobData.client_contact_name}</strong></p>
                <p>Lead creator: <strong className="text-danger">{this.props.ownerName}</strong></p>
                </div>
                <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.props.onConfirm}>Yes</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.props.onCancel}>No</button>
                </div>
            </div>
            </div>
        </div>
        </>
    )
  }
}

export default Modal