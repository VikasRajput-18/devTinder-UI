import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./slices/userSlice"
import feedSlice from "./slices/feedSlice"
import connectionSlice from "./slices/connectionSlice"
import requestSlice from "./slices/requestSlice"

export const store = configureStore({
    reducer: {
        user: userSlice,
        feed: feedSlice,
        connections: connectionSlice,
        requests: requestSlice
    },
})