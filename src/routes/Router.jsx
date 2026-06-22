import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Profile from "../pages/Profile/Profile";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/Dashboard/Dashboard";
import BrowseStartups from "../pages/BrowseStartups/BrowseStartups";
import BrowseOpportunities from "../pages/BrowseOpportunities/BrowseOpportunities";
import AdminRoute from "./AdminRoute";
import FounderRoute from "./FounderRoute";
import AddOpportunity from "../pages/FounderDashboard/AddOpportunity";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import FounderDashboard from "../pages/FounderDashboard/FounderDashboard";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AddStartup from "../pages/FounderDashboard/AddStartup";
import MyApplications from "../pages/MyApplications/MyApplications";
import Applications from "../pages/FounderDashboard/Applications";
import EditStartup from "../pages/FounderDashboard/EditStartup";
import EditOpportunity from "../pages/FounderDashboard/EditOpportunity";
import CollaboratorDashboard from "../pages/CollaboratorDashboard/CollaboratorDashboard";
import OpportunityDetails from "../pages/OpportunityDetails/OpportunityDetails";
import DashboardLayout from "../layouts/DashboardLayout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
  path: "/admin-dashboard",
  element: (
    <PrivateRoute>
      <AdminRoute>
        <AdminDashboard />
      </AdminRoute>
    </PrivateRoute>
  ),
},
{
  path: "/opportunities/:id",
  element: (
    <PrivateRoute>
      <OpportunityDetails />
    </PrivateRoute>
  ),
},
{
  path: "/collaborator-dashboard",
  element: (
    <PrivateRoute>
      <CollaboratorDashboard />
    </PrivateRoute>
  ),
},
{
  path: "/dashboard/edit-opportunity/:id",
  element: (
    <PrivateRoute>
      <FounderRoute>
        <EditOpportunity />
      </FounderRoute>
    </PrivateRoute>
  ),
},
{
  path: "/dashboard/edit-startup/:id",
  element: (
    <PrivateRoute>
      <FounderRoute>
        <EditStartup />
      </FounderRoute>
    </PrivateRoute>
  ),
},
{
  path: "/founder-applications",
  element: (
    <PrivateRoute>
      <FounderRoute>
        <Applications />
      </FounderRoute>
    </PrivateRoute>
  ),
},
{
  path: "/my-applications",
  element: (
    <PrivateRoute>
      <MyApplications />
    </PrivateRoute>
  ),
},
{
  path: "/dashboard/add-opportunity",
  element: (
    <PrivateRoute>
      <FounderRoute>
        <AddOpportunity />
      </FounderRoute>
    </PrivateRoute>
  ),
},
{
  path: "/dashboard",
  element: <DashboardLayout />,
  children: [
    {
      path: "/dashboard",
      element: <div className="text-2xl font-bold">Dashboard Home</div>,
    },
  ],
},
{
  path: "/dashboard/add-startup",
  element: (
    <PrivateRoute>
      <FounderRoute>
        <AddStartup />
      </FounderRoute>
    </PrivateRoute>
  ),
},
{
  path: "/founder-dashboard",
  element: (
    <PrivateRoute>
      <FounderRoute>
        <FounderDashboard />
      </FounderRoute>
    </PrivateRoute>
  ),
},
      {
        path: "/login",
        element: <Login />,
      },
      {
  path: "/dashboard",
  element: (
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  ),
},
      {
        path: "/register",
        element: <Register />,
      },

      {
        path: "/profile",
        element: <Profile />,
      },

      {
        path: "/browse-startups",
        element: <BrowseStartups />,
      },

      {
        path: "/browse-opportunities",
        element: <BrowseOpportunities />,
      },
    ],
  },
]);

export default router;