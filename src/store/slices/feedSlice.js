import { createSlice } from "@reduxjs/toolkit";


const initialState = null

const feedSlice = createSlice({
    name: "feed",
    initialState: initialState,
    reducers: {
        addFeed: (state, action) => {
            return action.payload
        },
        removeUser: () => {
            return null
        }
    }
})

export const { addFeed } = feedSlice.actions

export default feedSlice.reducer