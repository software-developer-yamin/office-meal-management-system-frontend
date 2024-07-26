import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Layout from "@/components/layout";
import RoleBasedGuard from "@/components/role-based-guard";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const Dashboard = lazy(() => import("@/pages/dashboard"));
const SignIn = lazy(() => import("@/pages/sign-in"));
const SignUp = lazy(() => import("@/pages/sign-up"));
const Users = lazy(() => import("@/pages/users"));
const Items = lazy(() => import("@/pages/items"));
const Meals = lazy(() => import("@/pages/meals"));
const SaveMeals = lazy(() => import("@/pages/add-meal"));
const MealSchedule = lazy(() => import("@/pages/meal-schedule"));
const MealOrder = lazy(() => import("@/pages/meal-order"));
const AccessDenied = lazy(() => import("@/pages/access-denied"));

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        element: <RoleBasedGuard allowedRoles={["ADMIN", "USER"]} />,
        children: [
          {
            path: "/meal-orders",
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <MealOrder />
              </Suspense>
            ),
          },
        ],
      },
      {
        element: <RoleBasedGuard allowedRoles={["ADMIN"]} />,
        children: [
          {
            path: "/users",
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <Users />
              </Suspense>
            ),
          },
          {
            path: "/items",
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <Items />
              </Suspense>
            ),
          },
          {
            path: "/meals",
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <Meals />
              </Suspense>
            ),
          },
          {
            path: "/add-meal",
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <SaveMeals />
              </Suspense>
            ),
          },
          {
            path: "/meal-schedule",
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <MealSchedule />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "/sign-in",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <SignIn />
      </Suspense>
    ),
  },
  {
    path: "/sign-up",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <SignUp />
      </Suspense>
    ),
  },
  {
    path: "/access-denied",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <AccessDenied />
      </Suspense>
    ),
  },
  { path: "*", element: <Navigate to="/" replace /> },
]);

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};
