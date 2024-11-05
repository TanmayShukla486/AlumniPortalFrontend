import React from "react"

const EmptyBlock = ({
  val,
  revertBack,
}: {
  val: string
  revertBack: () => void
}) => {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
      onClick={revertBack}
    >
      <img
        src="/404.png"
        alt="404 Not found"
        className="rounded-xl border-2 border-bg-dark"
      />
      <div className="text-4xl font-extrabold">No {val}</div>
    </div>
  )
}

export default EmptyBlock
