import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import usersSlice from "./slice/usersSlice";
import unautorizeDialogSlice from "./slice/unautorizeDialogSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    users: usersSlice,
    unautorizeDialog: unautorizeDialogSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
