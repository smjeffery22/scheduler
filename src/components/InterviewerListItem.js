import React from "react";
import classNames from "classnames";
import "./InterviewerListItem.scss";

function InterviewerListItem(props) {
  const { id, name, avatar, selected, setInterviewer } = props;
  const interviewerClass = classNames(
    "interviewers__item",
    { "interviewers__item--selected": selected }
  );
    
  // function for showing interviewer's name if selected
  const showInterviewerName = () => selected && name;

  return (
    // this also works but Storybook for InterviewerListItem clickable would not work
    //  since working with two different datasets
    // <li className={interviewerClass} onClick={setInterviewer}>
    <li className={interviewerClass} onClick={() => setInterviewer(id)}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt="Sylvia Palmer"
      />
      {showInterviewerName()}
    </li>
  );
}

export default InterviewerListItem;