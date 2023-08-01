import { configureStore } from "@reduxjs/toolkit";
import termsReducer from "./termsReducer";
const store = configureStore({
  reducer: { termsReducer: termsReducer},
});
export default store;