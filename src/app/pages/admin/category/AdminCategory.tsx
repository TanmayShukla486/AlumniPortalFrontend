import React, { useEffect, useState } from "react"
import AdminWrapper2 from "../components/AdminWrapper2"
import { IconButton, Input, Skeleton, SvgIcon, TextField } from "@mui/material"
import EventItem from "../../../components/reusable/event-item"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import {
  addEvent,
  filterEvent,
  getEvents,
  removeEvent,
  selectEventList,
  selectEventListStatus,
} from "../../../../features/events/eventSlice"
import { selectToken } from "../../../../features/user/userSlice"
import {
  addCategory,
  Category,
  fetchCategories,
  removeCategory,
  selectCategories,
  selectCategoriesStatus,
} from "../../../../features/categories/categorySlice"
import DeleteIcon from "@mui/icons-material/Delete"

const CategoryItem = ({
  category,
  handleRemove,
}: {
  category: Category
  handleRemove: (val: string) => void
}) => {
  return (
    <div className="px-4 py-2 bg-gradient-to-r from-content-light/20 to-content-light rounded-md my-2 flex flex-row items-center justify-between border-2 border-white">
      <div>{category.title}</div>
      <IconButton onClick={() => handleRemove(category.title)}>
        <SvgIcon component={DeleteIcon} sx={{ color: "white" }} />
      </IconButton>
    </div>
  )
}

const AdminCategory = () => {
  const inputsx = {}
  const dispatch = useAppDispatch()
  const categories = useAppSelector(selectCategories)
  const categoriesStatus = useAppSelector(selectCategoriesStatus)
  const [category, setCategory] = useState<string>("")
  const [eventDesc, setEventDesc] = useState<string>("")
  const [date, setDate] = useState<string>("")
  const token =
    useAppSelector(selectToken) || localStorage.getItem("token") || ""
  const handleAddCategory = () => {
    if (!category) return
    const obj: Category = { title: category, color: "trans" }
    console.log("HERE")
    dispatch(addCategory({ token, category: obj }))
  }
  const handleRemoveCategory = (val: string) => {
    dispatch(removeCategory({ token, category: val }))
  }
  useEffect(() => {
    dispatch(fetchCategories(token))
  }, [])
  return (
    <AdminWrapper2>
      <div className="grid grid-cols-10 pr-4 h-[88.5vh] gap-x-2">
        <div className="col-span-7 p-4 overflow-y-scroll hide-scrollbar bg-transparent flex flex-col">
          <div className="text-3xl font-extrabold text-transparent bg-gradient-to-br from-bg-light to-bg-dark bg-clip-text">
            Create Event
          </div>
          <div className="flex flex-col">
            <div className="text-lg font-semibold pt-2 pb-2">Event Title</div>
            <Input
              className="w-full"
              placeholder="Enter appropriate category title"
              sx={inputsx}
              value={category}
              onChange={e => setCategory(e.target.value)}
            />
          </div>

          <div className="flex justify-end items-center">
            <div className="pt-2 flex flex-col">
              <button
                className="mt-4 shadow-button mr-4 bg-content-light p-2 font-bold text-white border-2 border-white rounded-xl"
                onClick={handleAddCategory}
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-b from-bg-light to-bg-dark col-span-3 text-white p-4 -mt-4 -mr-4 h-[93vh] border-l-2 border-white">
          <div className="text-2xl font-extrabold">Current Categories</div>
          {categoriesStatus === "LOADING" && (
            <div className="flex flex-col -space-y-4">
              <Skeleton
                className="w-full p-8 h-16 rounded-full"
                sx={{
                  color: "0f0f0f",
                  borderRadius: "16px",
                }}
              />
              <Skeleton
                className="w-full p-8 h-16 rounded-full"
                sx={{
                  color: "0f0f0f",
                  borderRadius: "16px",
                }}
              />
              <Skeleton
                className="w-full p-8 h-16 rounded-full"
                sx={{
                  color: "0f0f0f",
                  borderRadius: "16px",
                }}
              />
            </div>
          )}
          {categoriesStatus === "IDLE" && categories.length === 0 && (
            <div className="mt-4 opacity-50">No Categories found</div>
          )}
          <div className="overflow-y-scroll h-[95%] hide-scrollbar">
            {categoriesStatus === "IDLE" &&
              categories.length > 0 &&
              categories.map((category, index) => (
                <CategoryItem
                  category={category}
                  key={index}
                  handleRemove={handleRemoveCategory}
                />
              ))}
          </div>
        </div>
      </div>
    </AdminWrapper2>
  )
}

export default AdminCategory
