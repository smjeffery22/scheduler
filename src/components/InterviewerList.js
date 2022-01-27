import React from "react";
import PropTypes from "prop-types";
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss";

function InterviewerList(props) {
  const { interviewers, value, onChange } = props;

  const parsedInterviewerListItems = interviewers.map((singleInterviewer) => {
    return <InterviewerListItem
      key={singleInterviewer.id}
      name={singleInterviewer.name}
      avatar={singleInterviewer.avatar}
      selected={singleInterviewer.id === value}
      setInterviewer={() => onChange(singleInterviewer.id)}
    />
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {parsedInterviewerListItems}
      </ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
}

export default InterviewerList;