import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss";

function InterviewerList(props) {
  const { interviewers, interviewer, setInterviewer } = props

  const parsedInterviewerListItems = interviewers.map((singleInterviewer) => {
    return <InterviewerListItem
      key={singleInterviewer.id}
      name={singleInterviewer.name}
      avatar={singleInterviewer.avatar}
      selected={singleInterviewer.id === interviewer}
      setInterviewer={() => setInterviewer(singleInterviewer.id)}
    />
  })


  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {parsedInterviewerListItems}
      </ul>
    </section>
  );
}

export default InterviewerList;