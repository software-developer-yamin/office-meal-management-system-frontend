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
      </Route>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  );
}

export default App;
