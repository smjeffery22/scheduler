import React from "react";
import classNames from "classnames"
import "components/Button.scss";

function Button(props) {
   const { confirm, danger, onClick, disabled, children } = props;

   let btnClass = classNames(
      "button",
      {
         "button--confirm": confirm,
         "button--danger": danger
      }
   );

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

export default Button;