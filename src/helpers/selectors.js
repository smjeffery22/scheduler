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