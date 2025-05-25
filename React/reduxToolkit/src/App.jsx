import React from 'react'
import {useSelector , useDispatch} from "react-redux"
import { increment , decrement } from './slices/counterSlices'
const App = () => {
const count = useSelector((state)=>state.counter)
const dispatch = useDispatch()
  return (
    <div>
      <p>{count}</p>
      <button onClick={()=>dispatch(increment())} >Increment</button>
      <button onClick={()=>dispatch(decrement())}>Decrement</button>
    </div>
  )
}

export default App