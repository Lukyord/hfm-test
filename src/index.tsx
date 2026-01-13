import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import reportWebVitals from "./reportWebVitals.ts";
import Homepage from "./pages/Homepage.tsx";

import "./assets/css/global.css";
import "./assets/css/global-rwd.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Homepage />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
    <React.StrictMode>
        <Toaster />
        <RouterProvider router={router} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
