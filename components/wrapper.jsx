import clsx from "clsx";
import React from "react";

const Wrapper = ({ children, classNames }) => {
  return (
    <div className={clsx("container mx-auto", classNames)}>{children}</div>
  );
};

export default Wrapper;
