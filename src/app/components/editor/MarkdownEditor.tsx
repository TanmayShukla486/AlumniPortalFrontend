import {
  Button,
  Card,
  Checkbox,
  CircularProgress,
  darken,
  Modal,
  TextField,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import React, { useEffect, useState } from "react"
import CustomInput from "../../pages/register/components/input-field"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import Paper from "@mui/material/Paper"
import MenuList from "@mui/material/MenuList"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp"
import SendIcon from "@mui/icons-material/Send"

import {
  Category,
  fetchCategories,
  selectCategories,
  selectCategoriesStatus,
} from "../../../features/categories/categorySlice"
import {
  selectRefreshToken,
  selectToken,
} from "../../../features/user/userSlice"
import CategoryItem from "./category-item"
import {
  Blog,
  postBlog,
  resetBlogStatus,
  selectBlogStatus,
} from "../../../features/blogs/blogSlice"
import CustomButton from "../reusable/custom-button"

const MarkdownEditor = () => {
  const dispatch = useAppDispatch()
  const categories = useAppSelector(selectCategories)
  const categoryStatus = useAppSelector(selectCategoriesStatus)
  const token =
    useAppSelector(selectToken) || localStorage.getItem("token") || ""
  const refreshToken = useAppSelector(selectRefreshToken) || ""
  useEffect(() => {
    dispatch(fetchCategories(token))
  }, [])

  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [categoriesVisible, setCategoriesVisible] = useState<boolean>(false)
  const [category, setCategory] = useState<string>("")
  const [commentsEnabled, setCommentsEnabled] = useState<boolean>(false)
  const blogStatus = useAppSelector(selectBlogStatus)

  const handleCategoryClick = (val: string) => {
    setCategory(val)
    setCategoriesVisible(false)
  }

  const handleSubmit = () => {
    const blog: Blog = {
      id: 0,
      title,
      category,
      color: "trans",
      content,
      author: "",
      likes: 0,
      commentsEnabled,
    }
    dispatch(
      postBlog({
        token,
        refreshToken,
        blog,
      }),
    )
  }

  const handleClearClick = () => {
    dispatch(resetBlogStatus())
    setTitle("")
    setContent("")
    setCategory("")
    setCommentsEnabled(false)
  }

  return (
    <div className="w-full h-full">
      <Modal className="fixed" open={blogStatus === "POSTED"}>
        <div className="w-1/2 h-1/2 bg-primary-dark opacity-50">
          <div className="text-2xl text-white font-bold">
            Successfully posted
          </div>
          <Button startIcon={<CloseIcon />} onClick={handleClearClick}>
            Close
          </Button>
        </div>
      </Modal>
      <Card
        className="w-[calc(100%-2rem)] h-[calc(100vh-9rem)] p-8 mt-8 overflow-hidden"
        sx={{
          borderRadius: "25px",
        }}
        raised
      >
        <div className="text-2xl font-extrabold bg-gradient-to-br from-gradient-alt to-primary-dark bg-clip-text text-transparent mb-2">
          Create Blog Post
        </div>
        <div className="w-full h-[calc(100%-2rem)] flex flex-col justify-start gap-y-4 p-4 border-4 border-primary-dark shadow-custom-inset rounded-xl">
          <div className="rounded-xl">
            <CustomInput
              title="Title"
              value={title}
              setValue={setTitle}
              classesPassed={false}
              classes=""
              disabled={false}
            />
          </div>
          <div className="bg-gradient-to-r w-full bg-clip-content rounded-md from-bg-grad-start to-bg-grad-end shadow-custom">
            <TextField
              className="w-full h-full p-4"
              size="medium"
              rows={12}
              value={content}
              placeholder="Type your content here"
              multiline
              onChange={e => setContent(e.target.value)}
              sx={{
                "& .MuiInputBase-input": {
                  color: "black", // Text color
                  borderRadius: "6px",
                },
                "& label.Mui-focused": {
                  color: "#bb5e19",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "transparent",
                  },
                  "&:hover fieldset": {
                    borderColor: "#B2BAC2",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#bb5e19",
                  },
                },
              }}
            />
          </div>
          <div className="flex justify-between w-full pr-2">
            <div className="bg-clip-content flex flex-col items-start">
              <CustomButton
                customBgColor="#b55e19"
                customBorder="2px solid black"
                customColor="#ffffff"
                onClick={() => setCategoriesVisible(!categoriesVisible)}
                endIcon={
                  categoriesVisible ? (
                    <ArrowDropUpIcon />
                  ) : (
                    <ArrowDropDownIcon />
                  )
                }
              >
                Categories
              </CustomButton>
              {categoriesVisible && (
                <Paper
                  className="fixed mt-8 overflow-scroll hide-scrollbar"
                  sx={{
                    width: "160px",
                    height: "80px",
                    maxWidth: "100%",
                    border: "solid 2px #b55e19",
                    borderRadius: "12px",
                  }}
                >
                  {categoryStatus === "LOADING" ||
                  categoryStatus === "ERROR" ? (
                    <div className="flex justify-center items-center mt-4">
                      <CircularProgress />
                    </div>
                  ) : (
                    <MenuList>
                      {categories.map(category => (
                        <CategoryItem
                          item={category}
                          handleClick={handleCategoryClick}
                          key={category.title}
                        />
                      ))}
                    </MenuList>
                  )}
                </Paper>
              )}
            </div>
            <div className="bg-primary-dark text-white font-bold rounded-xl flex flex-row items-center justify-center p-2 transition-all duration-300 ease-in-out">
              <div>Category: {category}</div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-xl text-primary-dark font-bold">
                Comments Enabled
              </div>
              <Checkbox
                sx={{
                  color: "#b55e19",
                  "&.Mui-checked": {
                    color: "#b55e19",
                  },
                }}
                value={commentsEnabled}
                onClick={() => setCommentsEnabled(!commentsEnabled)}
              />
            </div>
            <div>
              <CustomButton
                className="self-end"
                customBgColor="#b55e19"
                customBorder="2px solid black"
                customColor="#ffffff"
                endIcon={<SendIcon />}
                onClick={handleSubmit}
                sx={{
                  ":hover": {
                    backgroundColor: darken("#b55e19", 0.2),
                    translate: "-2px -2px 0px",
                    boxShadow: "2px 2px 4px #b55e19",
                    transition: "translate 0.3s linear, box-shadow 0.3s linear",
                  },
                }}
              >
                Submit
              </CustomButton>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default MarkdownEditor
