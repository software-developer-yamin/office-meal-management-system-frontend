import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  CalendarIcon,
  ClipboardListIcon,
  LayoutGridIcon,
  UserIcon,
  UtensilsIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

const cardItems = [
  {
    icon: <UserIcon className="h-12 w-12 text-primary" />,
    title: "User Management",
    description: "Manage users, assign roles, and monitor activity.",
    path: "/users",
    buttonText: "Manage Users",
  },
  {
    icon: <UtensilsIcon className="h-12 w-12 text-primary" />,
    title: "Item Management",
    description: "Add, edit, and categorize food items for meal planning.",
    path: "/items",
    buttonText: "Manage Items",
  },
  {
    icon: <CalendarIcon className="h-12 w-12 text-primary" />,
    title: "Meal Management",
    description: "Plan and manage weekly meals for your organization.",
    path: "/meals",
    buttonText: "Manage Meals",
  },
  {
    icon: <ClipboardListIcon className="h-12 w-12 text-primary" />,
    title: "Meal Orders",
    description: "Allow users to select and order meals for the week.",
    path: "/meal-orders",
    buttonText: "Manage Orders",
  },
  {
    icon: <LayoutGridIcon className="h-12 w-12 text-primary" />,
    title: "Meal Schedule",
    description: "View and manage the weekly meal schedule.",
    path: "/meal-schedule",
    buttonText: "View Schedule",
  },
];

type DashboardCardProps = {
  icon: React.ReactElement;
  title: string;
  description: string;
  path: string;
  buttonText: string;
};

const DashboardCard = ({
  icon,
  title,
  description,
  path,
  buttonText,
}: DashboardCardProps) => (
  <Card className="group">
    <CardHeader className="flex flex-col items-center gap-2">
      {icon}
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardFooter>
      <Link to={path} className="w-full">
        <Button>{buttonText}</Button>
      </Link>
    </CardFooter>
  </Card>
);

export default function Dashboard() {
  return (
    <main className="flex-1">
      <div className="container grid gap-10 py-10 md:grid-cols-2 lg:grid-cols-3">
        {cardItems.map((item, index) => (
          <DashboardCard key={index} {...item} />
        ))}
      </div>
    </main>
  );
}
