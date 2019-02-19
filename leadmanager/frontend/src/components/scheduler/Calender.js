import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer

const onEventSelection = (event) => (
  console.log(event.title)
  // <div>
  //   <h1>{event.title}</h1>
  // </div>
)


// to add week or day just add it to the views
const Calender = (props) => (
  <>
    <BigCalendar
      step={720}
      timeslots={1}
      events={props.eventList}
      localizer={localizer}
      views={['month', 'week', 'agenda']} 
      defaultView='month'
      onSelectEvent={event => onEventSelection(event)}
    />
    
  </>
)

export default Calender