import { useEffect, useReducer } from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLCATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY: {
      return { ...state, day: action.value };
    }

    case SET_APPLICATION_DATA: {
      return {
        ...state,
        days: action.value.days,
        appointments: action.value.appointments,
        interviewers: action.value.interviewers
      };
    }

    case SET_INTERVIEW: {
      return {
        ...state,
        appointments: action.value.appointments,
        days: action.value.days
      }
    }

    default: {
      throw new Error(`Tried to reduce with unsupported action type: ${action.type}`);
    }
  }
}

function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => dispatch({ type: SET_DAY, value: day })

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
      .then((all) => {
        dispatch({
          type: SET_APPLICATION_DATA,
          value: {
            days: all[0].data,
            appointments: all[1].data,
            interviewers: all[2].data
          }
        })
      })
      .catch((err) => console.log(err.message));
  }, []);

  useEffect(() => {
    const webSocket = new WebSocket('ws://localhost:8001')

    console.log(webSocket.readyState);

    webSocket.onopen = (e) => {
      webSocket.send("ping");

      console.log(webSocket.readyState);
    }

    webSocket.onmessage = (e) => {
      const msg = JSON.parse(e.data)
      // dispatch({ type: SET_INTERVIEW, msg.interview })
      console.log("Message received:", msg)
    }
  }, [])

  const updateSpots = (appointments) => {
    const daysArray = [...state.days];
    const currentDayIndex = daysArray.findIndex((day) => day.name === state.day);
    const currentDayObject = daysArray[currentDayIndex];
    const currentDayAppointments = currentDayObject.appointments
    let spotCounter = 0;

    for (const currentDayAppointment of currentDayAppointments) {
      // check with the updated appointments data
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

    // create a new object to copy all the appointments and add/replace (id) appointment data
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return (
      axios.put(`/api/appointments/${id}`, appointment)
        .then(() => {
          dispatch({
            type: SET_INTERVIEW,
            value: {
              appointments,
              days: updateSpots(appointments)
            }
          })
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
    };

    return (
      axios.delete(`/api/appointments/${id}`)
        .then(() => {
          dispatch({
            type: SET_INTERVIEW,
            value: {
              appointments,
              days: updateSpots(appointments)
            }
          })
        })
    )
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}

export default useApplicationData;