import React, { useState } from 'react'
import { addTodo, deleteTodo, editTodo } from './todoSlice'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const [input, setInput] = useState("")
  const todo = useSelector((state) => state.todos)
  const dispatch = useDispatch()

  function handleClick() {
    if (input.trim() !== "") {
      dispatch(addTodo(input))
      console.log("todo created")
      setInput("")
    }
  }

  function handleDelete(id){
    dispatch(deleteTodo(id))
  }
  function handleEdit({id , text}){
    const newText = prompt("enter your text" ,text)
    if(newText.trim() !== " "){
      dispatch(editTodo({id:id , newText:newText}))
    }

  }
  
  return (
    <>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add some text"
      />
      <button onClick={handleClick}>Add Todo</button>

      <ul>
       {
        todo.map((ele , index)=>{
return <>
<div key={index} style={{display:'flex'}}>
  <h3>{index+1}. </h3>
  <h3>{ele.text}</h3>
  <button onClick={()=>handleEdit({id:ele.id , text:ele.text})}>edit</button>
<button onClick={()=>handleDelete(ele.id)}>Delete</button>
</div>
</>
        })
       }
      </ul>
    </>
  )
}

export default App
