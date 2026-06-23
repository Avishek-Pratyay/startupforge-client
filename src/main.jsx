import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import router from "./routes/Router";

import "./index.css";
import AuthProvider from "./providers/AuthProvider";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
<AuthProvider>
  <RouterProvider router={router} />
  <Toaster position="top-right" />
</AuthProvider>  </React.StrictMode>
);