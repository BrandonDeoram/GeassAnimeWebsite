import { configureStore } from "@reduxjs/toolkit";
import planToWatchReducer from "./planToWatch";
export default configureStore({
  reducer: {
    planToWatch: planToWatchReducer,
  },
});
