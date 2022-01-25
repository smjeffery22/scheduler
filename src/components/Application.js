import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";
import "components/Application.scss";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

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

    // 
    return (
      axios.put(`/api/appointments/${id}`, appointment)
        .then((res) => setState((prev) => ({ ...prev, appointments })))
        .catch((err) => console.log(err.message))
    );
  };

  const cancelInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    
    return (
      axios.delete(`/api/appointments/${id}`)
        .then((res) => setState((prev) => ({ ...prev, appointments })))
        .catch((err) => console.log(err.message))
    );
  };

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  // const dailyInterviewers = getInterviewersForDay(state, state.day);
  // console.log(dailyInterviewers)

  const parsedAppointments = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={dailyInterviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
    />
  });

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

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {parsedAppointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
