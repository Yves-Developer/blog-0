import Card from "./ui/card";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";

const Email = ({ className }) => {
  return (
    <div className="max-sm:px-[20px] max-md:px-[100px]">
      <Card
        className={cn(
          "p-4 flex gap-3 flex-col justify-between items-center",
          className
        )}
      >
        <h2 className="text-xl font-bold text-center">Newsletter</h2>
        <h3>Join 10k+ subscribers!</h3>
        <Input placeholder="Enter Your Email" />
        {/* Read More Button */}
        <Button className={cn("self-center mt-2 w-full")}>Read More</Button>
        <p className="text-center text-[#7d7f78]">
          By signing up, you agree to our Privacy Policy
        </p>
      </Card>
    </div>
  );
};

export default Email;
