
import {createStore} from "redux"
import countReducer from "./countReducer"

// store is created succesfully!
export const store = createStore(countReducer)