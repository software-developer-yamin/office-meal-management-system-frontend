import Layout from "@/components/layout";
import Dashboard from "./pages/dashboard";
import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up";
import Users from "./pages/users";
import Items from "./pages/items";
import Meals from "./pages/meals";
import SaveMeals from "./pages/add-meal";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "./components/require-auth";
import MealSchedule from "./pages/meal-schedule";
import MealOrder from "./pages/meal-order";
import AccessDenied from "./pages/access-denied";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/users"
          element={
            <RequireAuth component={<Users />} allowedRoles={["admin"]} />
          }
        />
        <Route
          path="/items"
          element={
            <RequireAuth component={<Items />} allowedRoles={["admin"]} />
          }
        />
        <Route
          path="/meals"
          element={
            <RequireAuth component={<Meals />} allowedRoles={["admin"]} />
          }
        />
        <Route
          path="/add-meal"
          element={
            <RequireAuth component={<SaveMeals />} allowedRoles={["admin"]} />
          }
        />
        <Route
          path="/meal-orders"
          element={
            <RequireAuth
              component={<MealOrder />}
              allowedRoles={["admin", "user"]}
            />
          }
        />
        <Route
          path="/meal-schedule"
          element={
            <RequireAuth
              component={<MealSchedule />}
              allowedRoles={["admin"]}
            />
          }
        />
      </Route>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/access-denied" element={<AccessDenied />} />
    </Routes>
  );
}

export default App;
