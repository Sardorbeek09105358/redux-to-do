import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const todoSlice = createSlice({
    initialState: {
        list: []
    },
    name: 'todo',
    reducers: {
        addTodo: (state, action) => {
            state.list = [action.payload, ...state.list]
         },
        deleteTodo: (state, action) => {
            state.list = state.list.filter((todo) => todo.id !== action.payload)
            message.info("todo deleted, id" + action.payload)
        },
        checkTodo: (state, action) => {
            state.list = state.list.map(todo => todo.id === action.payload)
        },
        saveTodo: (state, action) => {
            state.list = state.list.map((todo) =>(
                todo.id === action.payload.id ? {...todo, title: action.payload.title} : todo
            ))
        }
    }
})

export const {addTodo, deleteTodo, saveTodo} = todoSlice.actions
export default todoSlice.reducer