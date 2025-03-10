import clsx from "clsx";
import React from "react";

const Wrapper = ({ children, classNames }) => {
  return (
    <div className={clsx("container mx-auto max-sm:max-w-[450px]", classNames)}>
      {children}
    </div>
  );
};

export default Wrapper;
