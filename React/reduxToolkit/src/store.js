
import {configureStore} from "@reduxjs/toolkit"
import counterReducer from "./slices/counterSlices.js"

export const store = configureStore({
    reducer : {
        counter:counterReducer
    }
})