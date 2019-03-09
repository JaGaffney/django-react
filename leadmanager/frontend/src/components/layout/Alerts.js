import React, { Component } from 'react'
import { withAlert } from 'react-alert'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'


export class Alerts extends Component {
    static propTypes = {
        error: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired
    }

    // when a new prop is made error will run
    componentDidUpdate(prevProps){
        // object destructing
        const { error, alert, message } = this.props
        if (error !== prevProps.error){
            // displays error messages
            if (error.msg.name) {
                alert.error(`Name: ${error.msg.name.join()}`)
            }
            if (error.msg.email) {
                alert.error(`Email: ${error.msg.email.join()}`)
            }
            if (error.msg.message) {
                alert.error(`Message: ${error.msg.message.join()}`)
            }
            if (error.msg.non_field_errors) {
                alert.error(error.msg.non_field_errors.join())
            }
            if (error.msg.username) {
                alert.error(error.msg.username.join())
            }
            // Jobs page
            if (error.msg.job_name) {
                alert.error(`Name: ${error.msg.job_name.join()}`)
            }
            if (error.msg.job_type) {
                alert.error(`Type: ${error.msg.job_type.join()}`)
            }
            if (error.msg.client_business_name) {
                alert.error(`Business Name: ${error.msg.client_business_name.join()}`)
            }
            if (error.msg.client_contact_name) {
                alert.error(`Contact Name: ${error.msg.client_contact_name.join()}`)
            }
            if (error.msg.client_business_email) {
                alert.error(`Contact Email: ${error.msg.client_business_email.join()}`)
            }
            if (error.msg.cost) {
                alert.error(`Cost: ${error.msg.cost.join()}`)
            }
        }
        if (message !== prevProps.message) {
            if (message.deleteLead) {
                alert.success(message.deleteLead)
            }
            if (message.addLead) {
                alert.success(message.addLead)
            }
            if (message.deleteJob) {
                alert.success(message.deleteJob)
            }
            if (message.addJob) {
                alert.success(message.addJob)
            }
            if (message.passwordNotMatch) {
                alert.error(message.passwordNotMatch)
            }
        }
    }


    render() {
        return (
            <>
            </>
        )
    }
}

// map global state to components props
const mapStateToProps = state => ({
    error: state.errors,
    message: state.messages
})

// setting proptypes
Alerts.propTypes = {
    alert: PropTypes.object,
    dispatch: PropTypes.func,
    error: PropTypes.object,
    message: PropTypes.object,
}

export default connect(mapStateToProps)(withAlert(Alerts))
