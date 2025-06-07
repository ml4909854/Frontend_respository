import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Home from '../Component/Home'

const App = () => {

  const count = useSelector((state)=>state)
const dispatch = useDispatch()
  return ( 
    <div>
      <Home/>
      <button onClick={()=>dispatch({type:"I"})}>Increment</button>
      {count}
      <button onClick={()=>dispatch({type:"D"})}>Decrement</button>
    </div>
  )
}

export default App