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
  },
  interviewers: {
    "1": {  
      "id": 1,
      "name": "Sylvia Palmer",
      "avatar": "https://i.imgur.com/LpaY82x.png"
    },
    "2": {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
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

function getInterview(state, interview) {
  // return an object containing the interview data
  // if interviewer: id from appointments matches with interviewer's id from interviewers object

  // if no interview scheduled, return null
  if (!interview) return null;

  const interviewerId = interview.interviewer
  let interviewData = interview;

  // if there is interview, grab the interviewer's data and save it in a new object
  if (state.interviewers[interviewerId]) interviewData = {...interviewData, interviewer: state.interviewers[interviewerId]}

  return interviewData;
}

export {
  getAppointmentsForDay,
  getInterview
};

