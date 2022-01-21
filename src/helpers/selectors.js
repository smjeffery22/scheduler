const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3]
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5]
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  }
};

function getAppointmentsForDay(state, day) {
  // days array & appointments object from state
  const daysArray = state.days;
  const appointmentsObject = state.appointments;
  //  object from daysArray that matches the day parameter
  const filteredDay = daysArray.filter((eachDay) => eachDay.name === day)[0];

  // when days data is empty
  if (daysArray.length === 0) return [];

  // when no match is found
  if (!filteredDay) return [];

  // return all matched appointments for the day
  const parsedAppointments = []
  filteredDay.appointments.forEach((appointment) => {
    const matchedAppointment = appointmentsObject[appointment];

    if (matchedAppointment) parsedAppointments.push(matchedAppointment);
  })

  return parsedAppointments;
}

module.exports = { getAppointmentsForDay };