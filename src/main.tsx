import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import {loader as contactLoader } from './routes/contactLoader'
import  { loader as rootLoader  } from "./routes/dataLoader";
import { action as rootAction } from './routes/action'
import Contact from "./routes/contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction, 
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
      },
    ],
  },
  {
    path: "contacts/:contactId",
    element: <Contact />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")as Element).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

