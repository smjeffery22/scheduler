import React from "react";
import classNames from "classnames"
import "components/Button.scss";

export default function Button(props) {
   // props change for different buttons
   // props.children - anything between Button opening/closing tags in Storybook file for each button
   const { confirm, danger, onClick, disabled, children } = props;

   let btnClass = classNames(
      "button",
      {
         "button--confirm": confirm,
         "button--danger": danger
      }
   )

   return (

      <button
         className={btnClass}
         onClick={onClick}
         disabled={disabled}
      >
         {children}
      </button>
   );
}