import {
    createBrowserRouter,
} from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../pages/Home/Home";
import Blogs from "../pages/Blogs/Blogs";
import Events from "../pages/Events/Events";
import Contact from "../pages/Contact/Contact";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import Statistics from "../pages/Dashboard/Member/Statistics";
import AddEvent from "../pages/Dashboard/Admin/AddEvent";
import PrivateRoute from "./PrivateRoute";
import AllEvents from "../pages/Dashboard/Admin/AllEvents";
import EventSegments from "../pages/EventSegments/EventSegments";
import AddEventSegment from "../pages/Dashboard/Admin/AddEventSegment";
import EventSegmentDetails from "../components/EventSegmentDetails/EventSegmentDetails";
import AddBlog from "../pages/Dashboard/Admin/AddBlog";
import AboutPage from "../pages/AboutPage/AboutPage";
import AllBlogs from "../pages/Dashboard/Admin/AllBlogs";
import UpdateBlog from "../pages/Dashboard/Admin/UpdateBlog";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import UpdateEventSegment from "../pages/Dashboard/Admin/UpdateEventSegment";
import AllEventSegments from "../pages/Dashboard/Admin/AllEventSegments";
import AdminRoute from "./AdminRoute";
import Executives from "../pages/Executives/Executives";
import Developers from "../pages/Developers/Developers";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import ApplyForExecutive from "../pages/ApplyForExecutive/ApplyForExecutive";
import Recruit from "../pages/Dashboard/Admin/Recruit";
import Profile from "../pages/Dashboard/Common/Profile/Profile";
import MyForms from "../pages/Dashboard/Member/MyForms";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/about",
                element: <AboutPage />
            },
            {
                path: "/blogs",
                element: <Blogs />
            },
            {
                path: "/events",
                element: <Events />
            },
            {
                path: "/event/:name",
                element: <EventSegments />
            },
            {
                path: "event-segment-details/:id",
                element: <EventSegmentDetails />,
            },
            {
                path: "/contact",
                element: <Contact />
            },
            {
                path: "/executives",
                element: <Executives />
            },
            {
                path: "/developers",
                element: <Developers />
            },
            {
                path: "/apply-for-executive",
                element: <PrivateRoute> <ApplyForExecutive /> </PrivateRoute>
            },
        ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    // {
    //     index: true,
    //     path: "/dashboard/stat",
    //     element: <PrivateRoute><DashboardLayout><Statistics /></DashboardLayout></PrivateRoute>
    // },
    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                index: true,
                element: <PrivateRoute><Statistics /></PrivateRoute>
            },
            {
                path: "add-event",
                element: <AdminRoute><AddEvent /></AdminRoute>,
            },
            {
                path: "all-events",
                element: <AdminRoute><AllEvents /></AdminRoute>,
            },
            {
                path: "all-event-segments/:id",
                element: <AdminRoute><AllEventSegments /></AdminRoute>,
            },
            {
                path: "add-event-segment",
                element: <AdminRoute><AddEventSegment /></AdminRoute>,
            },
            {
                path: "update-event-segment/:id",
                element: <AdminRoute><UpdateEventSegment /></AdminRoute>,
            },
            {
                path: "add-blog",
                element: <AdminRoute><AddBlog /></AdminRoute>,
            },
            {
                path: "manage-users",
                element: <AdminRoute><ManageUsers /></AdminRoute>,
            },
            {
                path: "all-blogs",
                element: <AdminRoute><AllBlogs /></AdminRoute>,
            },
            {
                path: "update-blog/:id",
                element: <AdminRoute><UpdateBlog /></AdminRoute>,
            },
            {
                path: "recruit",
                element: <AdminRoute><Recruit /></AdminRoute>,
            },
            {
                path: "profile",
                element: <PrivateRoute><Profile /></PrivateRoute>,
            },
            {
                path: "my-forms",
                element: <PrivateRoute><MyForms /></PrivateRoute>,
            },
        ]
    },
]);


