import { toeflApi } from "@/lib/axios/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const getUserProfile = createAsyncThunk(
  "getUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await toeflApi.get("/user/profile");

      if (res.data) {
        return res.data.data;
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        throw rejectWithValue(error.response?.data);
      }
    }
  }
);

export type UsersProfileInterface = {
  id: string;
  exam: string;
  name: string;
  username: string;
};

type InitialState = {
  data: UsersProfileInterface;
  isLoading: boolean;
  error: string;
};

const initialState: InitialState = {
  data: {
    id: "",
    exam: "",
    name: "",
    username: "",
  },
  isLoading: false,
  error: "",
};

const userProfileSlice = createSlice({
  name: "userProfileSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = "";
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "";
      });
  },
});

export default userProfileSlice.reducer;
