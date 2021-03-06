import React from "react";
import DayListItem from "./DayListItem";

function DayList(props) {
  const { days, value, onChange } = props;
  
  const parsedDayListItem = days.map((singleDay) => {
    return <DayListItem
      key={singleDay.id}
      name={singleDay.name}
      spots={singleDay.spots}
      selected={singleDay.name === value}
      setDay={onChange}
    />
  });

  return (
    <ul>
      {parsedDayListItem}
    </ul>
  );
}

export default DayList;