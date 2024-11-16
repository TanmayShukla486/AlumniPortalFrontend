import CreateBlog from "./app/pages/create-blog/CreateBlog"
import Home from "./app/pages/home/Home"
import Login from "./app/pages/login/Login"
import Register from "./app/pages/register/Register"
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import ViewBlogs from "./app/pages/view-blog/ViewBlogs"
import Blog from "./app/pages/blog/Blog"
import SearchPage from "./app/pages/search-page/SearchPage"
import Popular from "./app/pages/popular/Popular"
import AdminHome from "./app/pages/admin/home/AdminHome"
import AdminEvent from "./app/pages/admin/events/AdminEvent"
import AlumniDisplay from "./app/pages/alumni/AlumniDisplay"
import UserPage from "./app/pages/user-page/UserPage"
import ChatPage from "./app/pages/chat/ChatPage"
import About from "./app/pages/about/About"
import Contact from "./app/pages/contact/Contact"
import JobPosting from "./app/pages/jobs/JobPosting"
import AdminJobPosting from "./app/pages/admin/posting/AdminJobPosting"
import SinglePosting from "./app/pages/admin/posting/SinglePosting"
import Postings from "./app/pages/jobs/Postings"
import Posting from "./app/pages/jobs/Posting"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/register" />,
  },
  {
    path: "/job-posting/create",
    element: <JobPosting />,
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
    path: "admin/job-posting",
    element: <AdminJobPosting />,
  },
  {
    path: "admin/job-posting/:id",
    element: <SinglePosting />,
  },
  {
    path: "job-posting/all",
    element: <Postings />,
  },
  {
    path: "job-posting/:id",
    element: <Posting />,
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
