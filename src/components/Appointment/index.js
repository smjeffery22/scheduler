import React from "react";
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
      .catch(() => transition(ERROR_SAVE));
  };

  // delete interview when confirmed
  const deleteInterview = () => {
    transition(DELETING);

    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE));
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
      {mode === CREATE && <Form interviewers={interviewers} onCancel={back} onSave={save} />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && <Confirm message="Delete the appointment?" onConfirm={deleteInterview} onCancel={back} />}
      {mode === EDIT && <Form studentName={interview.student} interviewerId={interview.interviewer.id} interviewers={interviewers} onSave={save} onCancel={back} />}

      {mode === ERROR_SAVE && <Error message="Could not save appointment" onClose={() => transition(EMPTY)}/>}
      {mode === ERROR_DELETE && <Error message="Could not delete appointment" onClose={() => transition(SHOW)}/>}
    </article>
  );
}

export default Appointment;