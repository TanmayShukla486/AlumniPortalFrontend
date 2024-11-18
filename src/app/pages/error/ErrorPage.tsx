import React from "react"
import { Link } from "react-router-dom"

const ErrorPage = () => {
  return (
    <div className="w-full h-full items-center flex justify-center">
      <div className="w-1/3 h-1/3 bg-content-dark border-2 border-white rounded-md p-8">
        <Link to={"/home"}>
          <div className="text-3xl font-bold text-white flex items-center justify-center w-full h-full">
            404 - Page Not Found
          </div>
        </Link>
      </div>
    </div>
  )
}

export default ErrorPage
