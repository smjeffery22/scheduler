import React from "react";
import Header from "./Header";
import "./styles.scss";

function Appointment(props) {
  const { time } = props;

  return (
    <article className="appointment">
      {time ? `Appointment at ${time}` : "No Appointments"}
    </article>
  );
}

export default Appointment;