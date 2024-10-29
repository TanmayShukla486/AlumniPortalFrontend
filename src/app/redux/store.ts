import type { ThunkAction, Action } from "@reduxjs/toolkit"
import { configureStore, combineSlices } from "@reduxjs/toolkit"
import { userSlice } from "../../features/user/userSlice"
import { setupListeners } from "@reduxjs/toolkit/query"
import { profileSlice } from "../../features/profile/profileSlice"
import { blogListSlice } from "../../features/blogs/blogListSlice"
import { commentSlice } from "../../features/blogs/commentSlice"
import { blogSlice } from "../../features/blogs/blogSlice"
import { categorySlice } from "../../features/categories/categorySlice"
import { followingSlice } from "../../features/following/followingSlice"

const rootReducer = combineSlices(
  userSlice,
  profileSlice,
  blogListSlice,
  commentSlice,
  blogSlice,
  categorySlice,
  followingSlice,
)
export type RootState = ReturnType<typeof rootReducer>

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleWare => {
      return getDefaultMiddleWare()
    },
    preloadedState,
  })
  setupListeners(store.dispatch)
  return store
}

export const store = makeStore()

export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
