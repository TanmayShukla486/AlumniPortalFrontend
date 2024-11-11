import CreateBlog from "./app/pages/create-blog/CreateBlog"
import Home from "./app/pages/home/Home"
import Login from "./app/pages/login/Login"
import Register from "./app/pages/register/Register"
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import ViewBlogs from "./app/pages/view-blog/ViewBlogs"
import Blog from "./app/pages/blog/Blog"
import SearchPage from "./app/pages/search-page/SearchPage"
import Wrapper2 from "./app/components/wrapper/Wrapper2"
import Popular from "./app/pages/popular/Popular"
import AdminHome from "./app/pages/admin/home/AdminHome"
import AdminWrapper from "./app/pages/admin/components/AdminWrapper"
import AdminWrapper2 from "./app/pages/admin/components/AdminWrapper2"
import AdminEvent from "./app/pages/admin/events/AdminEvent"
import AlumniDisplay from "./app/pages/alumni/AlumniDisplay"
import UserPage from "./app/pages/user-page/UserPage"
import ChatPage from "./app/pages/chat/ChatPage"
import About from "./app/pages/about/About"
import Contact from "./app/pages/contact/Contact"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/register" />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create-blog",
    element: <CreateBlog />,
  },
  {
    path: "/feed",
    element: <ViewBlogs />,
  },
  {
    path: "/feed/:id",
    element: <Blog />,
  },
  {
    path: "/user/:username",
    element: <UserPage />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/events",
    element: <div>Events</div>,
  },
  {
    path: "/feed/search",
    element: <SearchPage />,
  },
  {
    path: "/chat",
    element: <ChatPage />,
  },
  {
    path: "feed/popular",
    element: <Popular />,
  },
  {
    path: "admin",
    element: <AdminHome />,
  },
  {
    path: "admin/events",
    element: <AdminEvent />,
  },
  {
    path: "alumni",
    element: <AlumniDisplay />,
  },
])

const App = () => {
  return (
    <div className="w-fill h-screen bg-gradient-to-br bg-cover from-content-light to-bg-dark flex justify-center items-center overflow-hidden ">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
