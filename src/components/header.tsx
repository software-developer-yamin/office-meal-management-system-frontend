import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { logout } from "@/redux/authSlice";
import { MenuIcon } from "lucide-react";

export default function Header() {
  const user = useAppSelector(({ auth }) => auth.user);
  const dispatch = useAppDispatch();
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to={"/"} className="flex items-center gap-2 font-bold">
          <MenuIcon className="h-6 w-6" />
          <span>Office Meal</span>
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-9 w-9">
                  <AvatarFallback>
                    {user?.email?.toLocaleUpperCase()?.at(0)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>My Account</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => dispatch(logout())}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/sign-in">LOGIN</Link>
          )}
        </div>
      </div>
    </header>
  );
}
