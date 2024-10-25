import CreateBlog from "./app/pages/create-blog/CreateBlog"
import Home from "./app/pages/home/Home"
import Login from "./app/pages/login/Login"
import Register from "./app/pages/register/Register"
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import ViewBlogs from "./app/pages/view-blog/ViewBlogs"
import Blog from "./app/pages/blog/Blog"

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
])

const App = () => {
  return (
    <div className="w-fill h-screen bg-gradient-to-b bg-cover from-bg-grad-start to-bg-grad-end flex justify-center items-center overflow-hidden ">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
