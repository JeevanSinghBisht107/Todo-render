import React from "react";
import "./global.css"
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/Routes";

function App() {
  return (
    <>
     {/* <Todowrapper/> */}
     <Toaster/>
     <RouterProvider router={routes} ></RouterProvider>
    </>
  )
}

export default App
