import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Todowrapper from "../components/Todowrapper";
import Protected from "../components/Protected";

export const routes = createBrowserRouter([
    {
        path:"/",
        element:<Home/>
    },
    {
        path:"/signup",
        element:<Signup/>
    },
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/todos",
        element:<Protected>
            <Todowrapper/>
        </Protected>  
    }
])