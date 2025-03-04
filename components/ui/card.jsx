import clsx from "clsx";

const Card = ({ children, className }) => {
  return (
    <div className={clsx("border-1 p-5 border-zinc-500 rounded-md", className)}>
      {children}
    </div>
  );
};

export default Card;
