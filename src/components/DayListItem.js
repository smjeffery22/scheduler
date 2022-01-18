import React, { useState } from "react";
import classNames from "classnames";
import "components/DayListItem.scss"

export default function DayListItem(props) {
  let dayClass = classNames(
    "day-list__item",
    {
      "day-list__item--selected": props.selected,
      "day-list__item--full": props.spots === 0
    }
  )
  
  const formatSpots = () => {
    if (props.spots === 0) {
      return "no spots remaining";
    }

    return props.spots === 1 ? "1 spot remaining" : `${props.spots} spots remaining`;
  };
  
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}