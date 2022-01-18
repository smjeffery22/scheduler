import React from "react";
import "components/Button.scss";
import classNames from "classnames"

export default function Button(props) {
   // props change for different buttons
   // props.children - anything between Button opening/closing tags in Storybook file for each button
   let btnClass = classNames(
      "button",
      {
         "button--confirm": props.confirm,
         "button--danger": props.danger
      }
   )

   return (

      <button
         className={btnClass}
         onClick={props.onClick}
         disabled={props.disabled}
      >
         {props.children}
      </button>
   );
}