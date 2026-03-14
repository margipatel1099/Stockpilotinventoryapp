import { createBrowserRouter } from "react-router";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Products } from "./pages/Products";
import { Receipts } from "./pages/Receipts";
import { Deliveries } from "./pages/Deliveries";
import { Transfers } from "./pages/Transfers";
import { Adjustments } from "./pages/Adjustments";
import { Warehouses } from "./pages/Warehouses";
import { History } from "./pages/History";
import { Profile } from "./pages/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/",
    Component: DashboardLayout,
    children: [
      {
        path: "dashboard",
        Component: Dashboard,
      },
      {
        path: "products",
        Component: Products,
      },
      {
        path: "receipts",
        Component: Receipts,
      },
      {
        path: "deliveries",
        Component: Deliveries,
      },
      {
        path: "transfers",
        Component: Transfers,
      },
      {
        path: "adjustments",
        Component: Adjustments,
      },
      {
        path: "warehouses",
        Component: Warehouses,
      },
      {
        path: "history",
        Component: History,
      },
      {
        path: "profile",
        Component: Profile,
      },
    ],
  },
]);
