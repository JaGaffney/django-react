import React, { Component } from 'react'

import Form from './Form'
import Jobs from './Jobs'

export class JobsDashboard extends Component {
  render() {
    return (
      <>
        <Form />
        <Jobs />
      </>
    )
  }
}

export default JobsDashboard

