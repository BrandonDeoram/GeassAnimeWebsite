import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: 0 };

export const updateListCounter = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
});

export const { increment } = updateListCounter.actions;

export default updateListCounter.reducer;
