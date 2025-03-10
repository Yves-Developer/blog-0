import Card from "./ui/card";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import Logo from "./logo";
import Link from "next/link";
import { SocialIcons } from "@/constants";

const About = ({ className }) => {
  return (
    <div className="max-sm:px-[20px] max-md:px-[100px]">
      <Card
        className={cn(
          "p-4 flex gap-5 flex-col justify-center items-center",
          className
        )}
      >
        <Logo />
        <h4 className="text-center line-clamp-5">
          Hello, We&apos;re content writer who is fascinated by content fashion,
          celebrity and lifestyle.
          <br /> We helps clients bring the right content to the right people.
        </h4>
        <div className="flex gap-3">
          {SocialIcons.map(({ link, Icon, color }) => (
            <Link key={link} href={link}>
              <Icon
                className={` p-2 rounded-sm w-8 h-8 border-1 border-muted-foreground hover:text-primary hover:border-primary transition-all duration-300 ease-in-out`}
              />
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default About;
