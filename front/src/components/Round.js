import React from "react";

import "./Round.css";

function Round(props) {
  const { type: Tag, className, before, ...rest } = props;

  const contentClass = "round__content" + (className ? " " + className : "");

  return (
    <div className="round">
      <div className="round__wrapper">
        {before}
        <Tag className={contentClass} {...rest}>
          {props.children}
        </Tag>
      </div>
    </div>
  );
}

export default Round;
