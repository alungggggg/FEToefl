import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import usersSlice from "./slice/usersSlice";
import unautorizeDialogSlice from "./slice/unautorizeDialogSlice";
import readingQuestionSlice from "./slice/readingQuestionSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    users: usersSlice,
    unautorizeDialog: unautorizeDialogSlice,
    readingQuestion : readingQuestionSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
