import Link from "next/link";
import React from "react";
import Logo from "./logo";

import Wrapper from "./wrapper";
import { Navdata, SocialIcons } from "@/constants";
import clsx from "clsx";
import { cn } from "@/lib/utils";
import { Menu, User } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <div className="py-4 top-0 left-0 right-0 sticky z-10 ">
      <Wrapper classNames={"flex justify-between items-center"}>
        <Link href={"/"}>
          <Logo />
        </Link>
        <div className="flex gap-3">
          {/* Active Link */}
          {/* <Link href={"/"} className="text-xl text-primary font-semi-bold">
            Home
          </Link> */}
          {Navdata.map((item) => (
            <Link
              key={item.title}
              href={item.title}
              className="text-md text-primary-foreground hover:text-primary transition-all duration-300 ease-in-out"
            >
              {item.title}
            </Link>
          ))}
        </div>
        <div className="flex gap-3">
          {SocialIcons.map(({ link, Icon, color }) => (
            <Link key={link} href={link}>
              <Icon
                className={` p-2 rounded-sm w-8 h-8 border-1 border-muted-foreground hover:text-primary hover:border-primary transition-all duration-300 ease-in-out`}
              />
            </Link>
          ))}
        </div>
        <div className="flex gap-3">
          <Link href="/account">
            <User className="p-2 rounded-sm w-8 h-8 bg-primary hover:bg-primary/10 hover:text-primary transition-all duration-300 ease-in-out" />
          </Link>
          {/* Mobile Navbar */}
          <Sheet className="bg-accent-foreground">
            <SheetTrigger asChild>
              <Button
                className={cn(
                  "p-2 rounded-sm w-8 h-8 bg-primary hover:bg-primary/10 hover:text-primary transition-all duration-300 ease-in-out"
                )}
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <Link href={"/"} className="text-center">
                <Logo />
              </Link>
              <div className="flex flex-col gap-3 items-center">
                {/* Active Link */}
                {/* <Link href={"/"} className="text-xl text-primary font-semi-bold">
            Home
          </Link> */}
                {Navdata.map((item) => (
                  <Link
                    key={item.title}
                    href={item.title}
                    className="text-md  hover:text-primary transition-all duration-300 ease-in-out"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
              <div className="flex gap-3 justify-center">
                {SocialIcons.map(({ link, Icon, color }) => (
                  <Link key={link} href={link}>
                    <Icon
                      className={` p-2 rounded-sm w-8 h-8 border-1 border-muted-foreground hover:text-primary hover:border-primary transition-all duration-300 ease-in-out`}
                    />
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Wrapper>
    </div>
  );
};

export default Navbar;
