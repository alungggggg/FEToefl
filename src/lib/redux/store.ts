import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import usersSlice from "./slice/usersSlice";
import unautorizeDialogSlice from "./slice/unautorizeDialogSlice";
import readingQuestionSlice from "./slice/questionSlice";
import examsSlice from "./slice/examsSlice";
import usersProfileSlice from "./slice/userProfileSlice";
import scoreSlice from "./slice/scoreSlice"

const store = configureStore({
  reducer: {
    auth: authSlice,
    users: usersSlice,
    unautorizeDialog: unautorizeDialogSlice,
    question: readingQuestionSlice,
    exams: examsSlice,
    userProfile: usersProfileSlice,
    score : scoreSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
