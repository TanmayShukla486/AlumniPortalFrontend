// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useSelector, useDispatch } from "react-redux"
import type { AppDispatch, RootState } from "./store"

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
