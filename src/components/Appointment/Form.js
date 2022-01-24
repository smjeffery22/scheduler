import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

function Form(props) {
  const { studentName, interviewerId, interviewers, onSave, onCancel, save } = props;
  const [student, setStudent] = useState(studentName || "");
  const [interviewer, setInterviewer] = useState(interviewerId || null);

  const reset = () => {
    setStudent("");
    setInterviewer(null);
  }

  // to clear form when cancel button is clicked
  const cancel = () => {
    reset();
    onCancel();
  }

  // to prevent the form from submitting
  const handleSubmit = (e) => e.preventDefault();

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(e) => setStudent(e.target.value)}
          />
        </form>
        <InterviewerList
          interviewers={interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => save(student, interviewer)}>Save</Button>
        </section>
      </section>
    </main>
  );
}

export default Form;