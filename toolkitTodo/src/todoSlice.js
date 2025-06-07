import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from '@reduxjs/toolkit'
import { act } from "react";

const todoSlice = createSlice({
    name:"todos",
    initialState:[],
    reducers:{
        addTodo:(state , action)=>{
           state.push({ 
            id:nanoid(),
            text:action.payload,
            completed:true
           })
        },
        deleteTodo:(state , action)=>{
            return state.filter((todo)=>todo.id !== action.payload)
        },
        editTodo:(state , action)=>{
            const {id , newText} = action.payload
            const todo = state.find(todo=>todo.id === id)
            if(todo){
                todo.text = newText
            }
        }
    }

})

export const {addTodo , deleteTodo , editTodo} = todoSlice.actions
export default todoSlice.reducer
