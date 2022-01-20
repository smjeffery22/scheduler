import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import "./styles.scss";

function Appointment(props) {
  const { id, time, interview } = props;

  return (
    <article className="appointment">
      <Header time={time} />
      {props.interview ? <Show student={interview.student} interviewer={interview.interviewer} /> : <Empty />}
    </article>
  );
}

export default Appointment;