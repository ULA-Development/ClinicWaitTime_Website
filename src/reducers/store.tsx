import { configureStore } from "@reduxjs/toolkit";
import mobileReducer from "./mobileReducer";
const store = configureStore({
  reducer: { isMobile: mobileReducer },
});
export default store;