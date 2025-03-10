import { cn } from "@/lib/utils";

const Header = ({ title, className }) => {
  return (
    <h1
      className={cn(
        "text-3xl flex self-center text-white font-bold mb-6",
        className
      )}
    >
      {title}
    </h1>
  );
};

export default Header;
