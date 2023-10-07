import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskList: [],
  isEdit: false,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    handleSubmit: (state, action) => {
      state.taskList.push(action.payload);
    },

    deleteTask: (state, action) => {
      const updatedList = [...state.taskList];

      const foundIndex = updatedList.findIndex(
        (task) => task.id === action.payload
      );
      updatedList.splice(foundIndex, 1);
      state.taskList = updatedList;
    },
    updateTask: (state, action) => {
      console.log(action.payload);
      const updatedList = [...state.taskList];
      const { id, title, desc } = action.payload;
      const foundIndex = updatedList.findIndex((task) => task.id === id);
      if (foundIndex !== -1) {
        state.taskList[foundIndex] = { id, title, desc };
      } else {
        console.error(`Task with id ${id} not found.`);
      }
    },
  },
});

export const { handleSubmit, deleteTask, updateTask, genrateId } =
  todoSlice.actions;

export default todoSlice.reducer;
