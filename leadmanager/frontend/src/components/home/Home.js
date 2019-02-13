import React, { Component } from 'react'

import Card from './Card'

export class Home extends Component {
  render() {
    return (
      <>
          <Card titleName={"Jobs"} description={"Displays all Jobs avaiable"} />
          <Card titleName={"Leads"} description={"Displays all of the current Leads"} />
          <Card titleName={"Employees"} description={"Displays employee contact details and data"} />

      </>
    )
  }
}

export default Home
