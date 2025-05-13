import Link from "next/link";
import React from "react";
import Logo from "./logo";

import Wrapper from "./wrapper";
import { Navdata, SocialIcons } from "@/constants";
import clsx from "clsx";
import { cn } from "@/lib/utils";
import { LinkIcon, Menu, User } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <div className="py-4 px-4 top-0 left-0 right-0 sticky z-10 bg-[#17171799] border-1 border-b border-[#262626] backdrop-blur-[10px]">
      <Wrapper classNames={"flex justify-between items-center"}>
        <Link href={"/"}>
          <Logo />
        </Link>
        <div className="flex gap-3 max-sm:hidden">
          {/* Active Link */}
          {/* <Link href={"/"} className="text-xl text-primary font-semi-bold">
            Home
          </Link> */}
          {Navdata.map((item) => (
            <Link
              key={item.title}
              href={item.title}
              className="text-md hover:text-primary transition-all duration-300 ease-in-out"
            >
              {item.title}
            </Link>
          ))}
        </div>
        <div className="flex gap-3 max-md:hidden">
          {SocialIcons.map(({ link, Icon, color }) => (
            <Link key={link} href={link}>
              <Icon
                className={` p-2 rounded-sm w-8 h-8 border-1 border-muted-foreground hover:text-primary hover:border-primary transition-all duration-300 ease-in-out`}
              />
            </Link>
          ))}
        </div>
        <div className="flex gap-3">
          <Link href="https://blog-cms-14.onrender.com" target="_blank">
            <User className="p-2 rounded-sm w-8 h-8 bg-primary hover:bg-primary/10 hover:text-primary transition-all duration-300 ease-in-out" />
          </Link>
          {/* Mobile Navbar */}
          <Sheet>
            <SheetTitle />
            <SheetTrigger asChild>
              <Button
                className={cn(
                  "p-2 rounded-sm w-8 h-8 bg-primary hover:bg-primary/10 hover:text-primary transition-all duration-300 ease-in-out"
                )}
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent className={cn("py-30 flex justify-between")}>
              <Link href={"/"} className="px-10">
                <Logo />
              </Link>
              <div className="flex flex-col gap-3 px-10 w-full">
                {/* Active Link */}
                {/* <Link href={"/"} className="text-xl text-primary font-semi-bold">
            Home
          </Link> */}
                {Navdata.map((item) => (
                  <Link
                    key={item.title}
                    href={item.title}
                    className="relative flex gap-3 items-center pb-2 text-md  hover:text-primary transition-all duration-300 ease-in-out before:absolute before:left-0 before:bottom-0 before:w-full before:h-[1px] before:bg-gradient-to-l before:from-transparent before:to-[#262626]"
                  >
                    <LinkIcon className="w-5 h-5 px-1 flex items-center justify-center border-1 rounded-sm flex-shrink-0" />

                    <span className="truncate block w-full">{item.title}</span>
                  </Link>
                ))}
              </div>
              <div className="flex gap-3 px-10">
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
