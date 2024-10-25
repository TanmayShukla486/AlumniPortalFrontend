import React from "react"
import CloseIcon from "@mui/icons-material/Close"
import DoneAllIcon from "@mui/icons-material/DoneAll"
import SvgIcon from "@mui/icons-material/Close"

export interface CompanyBubbleProps {
  title: string
  currentlyWorking: boolean
  remove: (val: string) => void
}

const CompanyBubble = ({
  title,
  currentlyWorking,
  remove,
}: CompanyBubbleProps) => {
  return (
    <div className="bg-white shadow-custom h-12 w-full rounded-lg flex items-center justify-between border-2 border-primary-dark">
      <div className="ml-4 flex">{title}</div>
      <div className="flex justify-center mr-4 gap-x-4">
        {currentlyWorking && (
          <div className="h-8 w-8 rounded-full flex items-center justify-center text-green-500 bg-green-800 border-white border-2 ">
            <SvgIcon component={DoneAllIcon} />
          </div>
        )}
        <div className="h-fit w-fit rounded-full">
          <SvgIcon
            className="cursor-pointer"
            component={CloseIcon}
            onClick={() => remove(title)}
          />
        </div>
      </div>
    </div>
  )
}

export default CompanyBubble
