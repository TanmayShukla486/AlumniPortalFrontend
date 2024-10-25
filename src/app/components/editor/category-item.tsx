import React from "react"
import { Category } from "../../../features/categories/categorySlice"
import { ListItemText, MenuItem } from "@mui/material"
import Divider from "@mui/material/Divider"

export interface CategoryItemProps {
  item: Category
  handleClick: (val: string) => void
}

const CategoryItem = ({ item, handleClick }: CategoryItemProps) => {
  return (
    <div>
      <MenuItem onClick={() => handleClick(item.title)}>
        <ListItemText>{item.title}</ListItemText>
      </MenuItem>
      <Divider className="bg-slate-900" variant="fullWidth" component={"li"} />
    </div>
  )
}

export default CategoryItem
