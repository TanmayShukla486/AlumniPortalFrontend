import { TextField } from "@mui/material"
import React from "react"

export interface FieldValue {
  value: string
  setValue: (val: string) => void
  title: string
  classesPassed: boolean
  classes: string
  disabled: boolean
}

const CustomInput = ({
  value,
  setValue,
  title,
  classesPassed,
  classes,
  disabled = false,
}: FieldValue) => {
  const color = classesPassed ? "white" : "black"
  const boxShadow = classesPassed ? "1px 2px 4px #b55e19" : "1px 2px 4px"
  return (
    <div
      className={
        !classesPassed
          ? "bg-gradient-to-r w-full bg-clip-content rounded-md from-bg-grad-start to-bg-grad-end"
          : classes
      }
    >
      <TextField
        className="w-full"
        placeholder={title}
        color={"primary"}
        value={value}
        disabled={disabled}
        onChange={e => setValue(e.target.value)}
        sx={{
          "& .MuiInputBase-input": {
            color: color, // Text color
            boxShadow: boxShadow,
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
  )
}

export default CustomInput
