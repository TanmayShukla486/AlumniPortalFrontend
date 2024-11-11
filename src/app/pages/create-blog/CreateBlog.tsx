import React, { useEffect, useState } from "react"
import MarkdownEditor from "../../components/editor/MarkdownEditor"
import Wrapper from "../../components/wrapper/Wrapper"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import {
  Category,
  fetchCategories,
  selectCategories,
  selectCategoriesStatus,
} from "../../../features/categories/categorySlice"
import { selectRole, selectToken } from "../../../features/user/userSlice"
import { Navigate } from "react-router-dom"

const CreateBlog = () => {
  const role = useAppSelector(selectRole)
  const categories = useAppSelector(selectCategories)
  const categoriesStatus = useAppSelector(selectCategoriesStatus)
  const dispatch = useAppDispatch()
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const token =
    useAppSelector(selectToken) || localStorage.getItem("token") || ""
  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories(token))
    }
  }, [])

  if (role === "STUDENT") return <Navigate to={"/home"} />
  return (
    <Wrapper>
      <div className="grid grid-cols-10 h-[83vh] gap-x-4 pr-4 pt-4">
        <div className="col-span-8 bg-transparent">
          <MarkdownEditor category={selectedCategory} />
        </div>
        <div className="col-span-2 bg-gradient-to-b from-content-dark to-content-light text-white p-4 rounded-2xl border-2 border-content-light">
          <div className="text-xl font-bold">Select Category</div>
          <div className="flex flex-col items-center justify-start space-y-2 mt-4 overflow-y-scroll hide-scrollbar">
            {categories.map(category => (
              <div
                className={`w-full border-2 border-white transition-all duration-300 cursor-pointer pl-2 rounded-full ${category.title === selectedCategory ? "bg-content-light text-content-dark" : ""}`}
                key={category.title}
                onClick={() => setSelectedCategory(category.title)}
              >
                {category.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default CreateBlog
