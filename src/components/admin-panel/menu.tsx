"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useSession, signOut } from "next-auth/react";
import { LogOut, Moon, Settings, Sun, User, CreditCard } from "lucide-react";

import { cn } from "@/lib/utils";
import { getMenuList } from "@/lib/menu-list";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CollapseMenuButton } from "@/components/admin-panel/collapse-menu-button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";

interface MenuProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Menu({ isOpen }: MenuProps) {
  const pathname = usePathname();
  const router = useRouter();
  const menuList = getMenuList();
  const { setTheme, theme } = useTheme();
  const { data: session, status } = useSession();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleSignOut = () => {
    signOut();
    setIsProfileOpen(false);
  };

  const handleSignIn = () => {
    router.push("/sign-in");
  };

  const getVariant = (href: string, active?: boolean) => {
    if (active !== undefined) return active ? "secondary" : "ghost"
    if (!pathname) return "ghost"
    return pathname.startsWith(href) ? "secondary" : "ghost"
  }

  return (
    <div className={cn("flex flex-col h-screen", isOpen ? "w-64" : "w-16")}>
      <ScrollArea className="flex-grow [&>div>div[style]]:!block">
        <nav className="p-2 h-full">
          <ul className="space-y-1">
            {menuList.map(({ groupLabel, menus }, groupIndex) => (
              <li
                key={groupIndex}
                className={cn("w-full", groupLabel ? "mt-6" : "")}
              >
                {isOpen && groupLabel && (
                  <p className="text-sm font-medium text-muted-foreground px-2 pb-2">
                    {groupLabel}
                  </p>
                )}
                {menus.map(
                  (
                    { href, label, icon: Icon, active, submenus },
                    menuIndex
                  ) => (
                    <div key={menuIndex} className="w-full">
                      {!submenus || submenus.length === 0 ? (
                        <TooltipProvider>
                          <Tooltip delayDuration={100}>
                            <TooltipTrigger asChild>
                              <Button
                                variant={getVariant(href, active)}
                                className={cn(
                                  "w-full justify-start h-10 mb-1",
                                  isOpen ? "px-2" : "px-0"
                                )}
                                asChild
                              >
                                <Link href={href}>
                                  <Icon
                                    size={18}
                                    className={cn(isOpen ? "mr-2" : "mx-auto")}
                                  />
                                  {isOpen && (
                                    <span className="truncate">{label}</span>
                                  )}
                                </Link>
                              </Button>
                            </TooltipTrigger>
                            {!isOpen && (
                              <TooltipContent side="right">
                                {label}
                              </TooltipContent>
                            )}
                          </Tooltip>
                        </TooltipProvider>
                      ) : (
                        <CollapseMenuButton
                          icon={Icon}
                          label={label}
                          active={
                            active === undefined
                              ? pathname?.startsWith(href) ?? false
                              : active
                          }
                          submenus={submenus}
                          isOpen={isOpen}
                        />
                      )}
                    </div>
                  )
                )}
              </li>
            ))}
          </ul>
        </nav>
      </ScrollArea>
      <div className="p-2 ">
        <TooltipProvider>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              {status === "authenticated" ? (
                <DropdownMenu
                  open={isProfileOpen}
                  onOpenChange={setIsProfileOpen}
                >
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start h-12",
                        isOpen ? "px-2" : "px-0"
                      )}
                    >
                      <Avatar
                        className={cn("h-8 w-8", isOpen ? "mr-2" : "mx-auto")}
                      >
                        <AvatarImage src={session.user?.image || ""} />
                        <AvatarFallback>
                          {session.user?.name?.[0] || "U"}
                        </AvatarFallback>
                      </Avatar>
                      {isOpen && (
                        <div className="flex flex-col items-start overflow-hidden">
                          <span className="text-sm font-medium truncate">
                            {session.user?.name}
                          </span>
                          <span className="text-xs text-muted-foreground truncate">
                            {session.user?.email}
                          </span>
                        </div>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>{session.user?.email}</DropdownMenuLabel>
                    <DropdownMenuLabel className="font-normal text-xs text-muted-foreground">
                      Free
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>Billing</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Preferences</DropdownMenuLabel>
                    <DropdownMenuRadioGroup
                      value={theme}
                      onValueChange={setTheme}
                    >
                      <DropdownMenuRadioItem value="light">
                        <Sun className="mr-2 h-4 w-4" />
                        <span>Light</span>
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="dark">
                        <Moon className="mr-2 h-4 w-4" />
                        <span>Dark</span>
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="system">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>System</span>
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start h-12",
                    isOpen ? "px-2" : "px-0"
                  )}
                  onClick={handleSignIn}
                >
                  <User size={18} className={cn(isOpen ? "mr-2" : "mx-auto")} />
                  {isOpen && <span>Sign In</span>}
                </Button>
              )}
            </TooltipTrigger>
            {!isOpen && (
              <TooltipContent side="right">
                {status === "authenticated" ? "Profile" : "Sign In"}
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
