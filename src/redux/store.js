import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import updateListSlice from "./updateListSlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    counter: updateListSlice,
  },
});

export default store;
