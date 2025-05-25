import React, { useContext } from 'react'
import userContext from '../context/context'

const Component1 = () => {
    const count = useContext(userContext)
  return (
    <div>{count}</div>
  )
}

export default Component1