function getAppointmentsForDay(state, day) {
  const daysArray = state.days;
  const appointmentsObject = state.appointments;
  const filteredDay = daysArray.filter((eachDay) => eachDay.name === day)[0];

  if (daysArray.length === 0) return [];

  if (!filteredDay) return [];

  // return all matched appointments for the day
  const parsedAppointments = [];
  filteredDay.appointments.forEach((appointment) => {
    const matchedAppointment = appointmentsObject[appointment];

    if (matchedAppointment) parsedAppointments.push(matchedAppointment);
  });

  return parsedAppointments;
}

function getInterviewersForDay(state, day) {
  const daysArray = state.days;
  const interviewersObject = state.interviewers;
  const filteredDay = daysArray.filter((eachDay) => eachDay.name === day)[0];

  if (daysArray.length === 0) return [];

  if (!filteredDay) return [];

  // return all matched interviewers for the day
  const parsedInterviewers = [];
  filteredDay.interviewers.forEach((interviewer) => {
    const matchedInterviewer = interviewersObject[interviewer];

    if (matchedInterviewer) parsedInterviewers.push(matchedInterviewer);
  });

  return parsedInterviewers;
}

function getInterview(state, interview) {
  if (!interview) return null;

  const interviewerId = interview.interviewer
  let interviewData = interview;

  // if there is interview, grab the interviewer's data and save it in a new object
  if (state.interviewers[interviewerId]) interviewData = { ...interviewData, interviewer: state.interviewers[interviewerId] }

  return interviewData;
}

export {
  getAppointmentsForDay,
  getInterviewersForDay,
  getInterview
};

