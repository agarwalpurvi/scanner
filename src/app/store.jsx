import { configureStore } from "@reduxjs/toolkit";
import reducer from "../features/qrSlice";  


export const store = configureStore({
  reducer: {
    qr: reducer,
  },
});