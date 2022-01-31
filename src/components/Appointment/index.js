import React, { useEffect } from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";
import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

function Appointment(props) {
  const { id, time, interview, interviewers, bookInterview, cancelInterview } = props;
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  // save interview when save button from the form is clicked
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  };

  // delete interview when confirmed
  const deleteInterview = () => {
    transition(DELETING, true);

    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  };

  useEffect(() => {
    if (mode === EMPTY && interview) {
      transition(SHOW)
    }

    if (mode === SHOW && interview === null) {
      transition(EMPTY)
    }

  }, [mode, interview, transition]);

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && interview && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE &&
        <Form
          interviewers={interviewers}
          onCancel={back}
          onSave={save}
        />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM &&
        <Confirm
          message="Delete the appointment?"
          onConfirm={deleteInterview}
          onCancel={back}
        />}
      {mode === EDIT &&
        <Form
          studentName={interview.student}
          interviewerId={interview.interviewer.id}
          interviewers={interviewers}
          onSave={save}
          onCancel={back}
        />}
      {mode === ERROR_SAVE &&
        <Error
          message="Could not save appointment"
          onClose={back}
        />}
      {mode === ERROR_DELETE &&
        <Error
          message="Could not delete appointment"
          onClose={back}
        />}
    </article>
  );
}

export default Appointment;