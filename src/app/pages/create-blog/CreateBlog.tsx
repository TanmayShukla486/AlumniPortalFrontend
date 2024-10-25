import React, { useEffect, useState } from "react"
import MarkdownEditor from "../../components/editor/MarkdownEditor"
import Wrapper from "../../components/wrapper/Wrapper"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import {
  Category,
  fetchCategories,
  selectCategories,
} from "../../../features/categories/categorySlice"

const CreateBlog = () => {
  return (
    <Wrapper>
      <MarkdownEditor />
    </Wrapper>
  )
}

export default CreateBlog
