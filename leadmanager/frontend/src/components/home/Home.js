import React, { Component } from 'react'

import Card from './Card'

// Home page view for the website, loads cards for each area
export class Home extends Component {
  render() {
    return (
      <>
          <Card titleName={"Jobs"} description={"Displays all Jobs avaiable"} />
          <Card titleName={"Leads"} description={"Displays all of the current Leads"} />
          <Card titleName={"Employees"} description={"Displays employee contact details (soon)"} />
          <Card titleName={"Schedule"} description={"Schedule Manager"} />

      </>
    )
  }
}

export default Home
