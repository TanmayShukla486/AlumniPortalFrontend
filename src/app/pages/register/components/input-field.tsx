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
  const color = "white"
  const boxShadow = classesPassed ? "1px 2px 4px #ffffff" : "1px 2px 4px"
  return (
    <div
      className={
        !classesPassed
          ? "bg-gradient-to-r w-full bg-clip-content rounded-md from-bg-light to-bg-dark"
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
              borderColor: "#f0f0f0",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#ffffff",
            },
          },
        }}
      />
    </div>
  )
}

export default CustomInput
