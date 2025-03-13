import clsx from "clsx";
import React from "react";

const Wrapper = ({ children, classNames }) => {
  return (
    <div
      className={clsx(
        "container lg:max-w-[1024] mx-auto max-sm:max-w-[450px]",
        classNames
      )}
    >
      {children}
    </div>
  );
};

export default Wrapper;
