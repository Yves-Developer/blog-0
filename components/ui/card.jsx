import clsx from "clsx";

const Card = ({ children, className }) => {
  return (
    <div
      className={clsx(
        "w-full border-1 p-5 border-[#262626] rounded-md bg-gradient-to-b from-[#1e1e1e] to-[#141414]",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
