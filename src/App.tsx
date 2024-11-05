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
    element: <div>Hello World</div>,
  },
  {
    path: "/events",
    element: <div>Events</div>,
  },
  {
    path: "/events",
    element: "Alumni",
  },
  {
    path: "/feed/search",
    element: <SearchPage />,
  },
  {
    path: "/chat",
    element: <Wrapper2></Wrapper2>,
  },
  {
    path: "feed/popular",
    element: <Popular />,
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
