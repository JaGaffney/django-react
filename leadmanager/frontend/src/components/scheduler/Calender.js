import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer



// to add week or day just add it to the views
const Basic = (props) => (
  <>
    <BigCalendar
      events={props.eventList}
      localizer={localizer}
      views={['month', 'agenda']} 
      defaultView='month'
      onSelectEvent={event => console.log(event)}
    />
    
  </>
)

export default Basic