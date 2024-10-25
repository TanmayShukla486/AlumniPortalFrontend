import { Card } from "@mui/material"
import Modal from "@mui/material/Modal"
import React from "react"
import { RegisterResponse } from "../Register"

export interface ModalProps {
  open: boolean
  setOpen: () => void
  handleClose: () => void
  data: RegisterResponse | undefined
}

interface InnerBox {
  title: string
  content: string
}

const InnerBox = ({ title, content }: InnerBox) => {
  return (
    <div className="w-full h-12 flex justify-evenly items-center">
      <div className="text-xl font-bold">{title}</div>
      <div className="text-lg">{content}</div>
    </div>
  )
}

const ConfirmationModal = ({
  open,
  setOpen,
  handleClose,
  data,
}: ModalProps) => {
  return (
    <div>
      <Modal
        className="flex items-center justify-center"
        open={open}
        onClose={handleClose}
      >
        <Card
          className="flex flex-col items-center justify-start w-1/3 h-[42%] p-2"
          sx={{
            border: "5px solid #b55e19",
            borderRadius: "25px",
          }}
        >
          <div className="text-3xl font-extrabold mt-4 bg-gradient-to-br from-gradient-alt to-primary-dark text-transparent bg-clip-text">
            Successfully Registered
          </div>
          {data && (
            <div className="w-full h-auto px-4 grid grid-cols-1 justify-center items-center mt-4">
              <InnerBox title={"Username:"} content={data.username} />
              <InnerBox title={"Email:"} content={data.email} />
              <InnerBox title={"Role:"} content={data.role} />
            </div>
          )}
          <button
            onClick={() => {
              handleClose()
              setOpen()
            }}
            className="mt-4 mb-6 bg-primary-dark text-white text-xl font-bold p-2 rounded-xl border-4 border-bg-primary"
          >
            Proceed to login
          </button>
        </Card>
      </Modal>
    </div>
  )
}

export default ConfirmationModal
