"use client";

import Link from "next/link";
import { MainNavItem } from "@/types";
import { User } from "next-auth";

import { cn } from "@/lib/utils";
import useScroll from "@/hooks/use-scroll";
import { Button, buttonVariants } from "@/components/ui/button";

import { MainNav } from "./main-nav";
import { UserAccountNav } from "./user-account-nav";

interface NavBarProps {
  user: Pick<User, "name" | "image" | "email"> | undefined;
  items?: MainNavItem[];
  children?: React.ReactNode;
  rightElements?: React.ReactNode;
  scroll?: boolean;
}

export function NavBar({
  user,
  items,
  children,
  rightElements,
  scroll = false,
}: NavBarProps) {
  const scrolled = useScroll(50);

  return (
    <header
      className={`sticky top-0 z-40 flex w-full justify-center bg-background/60 backdrop-blur-xl transition-all ${
        scroll ? (scrolled ? "border-b" : "bg-background/0") : "border-b"
      }`}
    >
      <div className="w-full p-4 flex h-16 items-center justify-between">
        <MainNav items={items}>{children}</MainNav>

        <div className="flex items-center space-x-3">
          {rightElements}

          {/* {!user ? (
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" })
                )}
              >
                Login Page
              </Link>
            ) : null} */}

          {user ? (
            <UserAccountNav user={user} />
          ) : (
            <Link href={"/auth/signin"}>
                <Button
                className="px-3"
                variant="default"
                size="sm"
              >
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}