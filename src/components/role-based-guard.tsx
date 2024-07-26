import { useAppSelector } from "@/redux/hook";
import { Navigate, Outlet } from "react-router-dom";
import React from "react";

type RoleBasedGuardProps = {
  allowedRoles: Array<"ADMIN" | "USER">;
  children?: React.ReactNode;
};

const RoleBasedGuard: React.FC<RoleBasedGuardProps> = ({
  allowedRoles,
  children,
}) => {
  const user = useAppSelector(({ auth }) => auth.user);

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/access-denied" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default RoleBasedGuard;
