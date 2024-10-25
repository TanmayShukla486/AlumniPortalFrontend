import React from "react"
import CircularProgress from "@mui/material/CircularProgress"
import Modal from "@mui/material/Modal"

export interface LoadingModalProps {
  openExp: boolean
}

const LoadingModal = ({ openExp }: LoadingModalProps) => {
  return (
    <div className="fixed z-10">
      <Modal
        className="absolute flex items-center justify-center h-full w-full opacity-75"
        open={openExp}
      >
        <div className=" bg-primary-dark w-1/2 h-1/2 rounded-2xl p-8 flex flex-col items-center justify-center text-4xl font-extrabold text-white">
          <div>Logging You In...</div>
          <div className="mt-8">
            <CircularProgress />
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default LoadingModal
