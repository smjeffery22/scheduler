import { useState, useEffect } from "react";
import axios from "axios";

function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
      .then((all) => {
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      })
      .catch((err) => console.log(err.message));
  }, []);

  // function updateSpots(id) {
  //   axios.get('/api/days')
  //     .then((response) => {
  //       setState((prev) => ({ ...prev, days: response.data }))
  //     })
  // }

  const updateSpots = (appointments) => {
    const currentDay = state.day;
    const daysArray = [...state.days];
    // const currentDayObject = daysArray.filter((day) => day.name === currentDay);
    const currentDayIndex = daysArray.findIndex((day) => day.name === currentDay);
    const currentDayObject = daysArray[currentDayIndex];
    const currentDayAppointments = currentDayObject.appointments
    let spotCounter = 0;

    for (const currentDayAppointment of currentDayAppointments) {
      if (appointments[currentDayAppointment].interview === null) spotCounter++;
    }

    daysArray[currentDayIndex].spots = spotCounter;

    return daysArray;
  };

  const bookInterview = (id, interview) => {
    // create a new object to copy specific (id) appointment and add/replace interview data
    // interview data passed from Appointment component
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    // create a new object to copy all the appointments and add/replace appointment data
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return (
      axios.put(`/api/appointments/${id}`, appointment)
        .then((res) => {
          setState((prev) => ({ ...prev, appointments, days: updateSpots(appointments) }));
        })
    );
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return (
      axios.delete(`/api/appointments/${id}`)
        .then((res) => {
          setState((prev) => ({ ...prev, appointments, days: updateSpots(appointments) }))
          // updateSpots(id)
        })
    )
  };

  // const updateSpots = () => {
  //   const currentDay = state.day;
  //   const currentDayObject = state.days.filter((day) => day.name === currentDay);
  //   const currentDayAppointments = currentDayObject[0].appointments
  //   let spotCounter = 0;

  //   for (const currentDayAppointment of currentDayAppointments) {
  //     if (state.appointments[currentDayAppointment].interview === null) spotCounter++;
  //   }
  //   console.log(spotCounter)

  //   const currentSpots = currentDayObject[0].spots;
  // };
  // updateSpots();

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}

export default useApplicationData;