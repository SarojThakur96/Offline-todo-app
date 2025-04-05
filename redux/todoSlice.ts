import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../db/sqlite";

interface TodoState {
  items: Todo[];
}

const initialState: TodoState = {
  items: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.items = action.payload;
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      // Add new todo to the beginning of the array
      state.items.unshift(action.payload);
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      // Remove the old version of the todo and add the updated one to the top
      const index = state.items.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.items.splice(index, 1); // Remove the old item
        state.items.unshift(action.payload); // Add updated item to the top
      }
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
  },
});

export const { setTodos, addTodo, updateTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;
