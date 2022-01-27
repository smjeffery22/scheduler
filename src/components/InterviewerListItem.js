import React from "react";
import classNames from "classnames";
import "./InterviewerListItem.scss";

function InterviewerListItem(props) {
  const { name, avatar, selected, setInterviewer } = props;
  const interviewerClass = classNames(
    "interviewers__item",
    { "interviewers__item--selected": selected }
  );
    
  // function for showing interviewer's name if selected
  const showInterviewerName = () => selected && name;

  return (
    <li className={interviewerClass} onClick={setInterviewer}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {showInterviewerName()}
    </li>
  );
}

export default InterviewerListItem;