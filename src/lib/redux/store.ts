import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import usersSlice from "./slice/usersSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    users: usersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
