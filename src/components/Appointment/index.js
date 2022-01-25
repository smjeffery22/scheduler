import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";
import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";

function Appointment(props) {
  const { id, time, interview, interviewers, bookInterview, cancelInterview, editInterview } = props;
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  // save interview when save button from the form is clicked
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    bookInterview(id, interview)
      .then(() => transition(SHOW));
  };

  // delete interview when confirmed
  const deleteInterview = () => {
    const interview = null;

    transition(DELETING);

    cancelInterview(id, interview)
      .then(() => transition(EMPTY))
  };

  return (
    <article className="appointment">
      <Header time={time} />
      {/* {interview ? <Show student={interview.student} interviewer={interview.interviewer} /> : <Empty />} */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && <Form interviewers={interviewers} onCancel={() => back(EMPTY)} onSave={save} />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && <Confirm message="Delete the appointment?" onConfirm={deleteInterview} onCancel={back} />}
      {mode === EDIT && <Form studentName={interview.student} interviewerId={interview.interviewer.id} interviewers={interviewers} onSave={save} onCancel={back} />}
    </article>
  );
}

export default Appointment;