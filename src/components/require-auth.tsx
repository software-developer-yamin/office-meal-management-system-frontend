import { useAppSelector } from "@/redux/hook";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface RequireAuthProps {
  component: JSX.Element;
  allowedRoles: string[];
}

const RequireAuth: React.FC<RequireAuthProps> = ({ component, allowedRoles }) => {
  const navigate = useNavigate();
  const user = useAppSelector(({ auth }) => auth.user);

  useEffect(() => {
    if (!user) {
      navigate("/sign-in");
    } else if (!allowedRoles.includes(user.role.toLowerCase())) {
      navigate("/access-denied");
    }
  }, [user, allowedRoles, navigate]);

  if (!user || !allowedRoles.includes(user.role.toLowerCase())) {
    return null;
  }

  return component;
};

export default RequireAuth;
