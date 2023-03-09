import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "planToWatch",
  initialState: {
    value: [],
  },
  reducers: {
    addAnime: (state, action) => {
      state.value.push(action.payload);
    },
    deleteAnime: (state, action) => {
      var index = state.value.indexOf(action.payload);
      state.value.splice(index);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addAnime, deleteAnime } = counterSlice.actions;

export default counterSlice.reducer;
