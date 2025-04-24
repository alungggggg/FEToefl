import { toeflApi } from "@/lib/axios/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const getScore = createAsyncThunk(
  "getScore",
  async ({ id_exam }: { id_exam: string }, { rejectWithValue }) => {
    try {
      const res = await toeflApi.get("/exams?id_exam=" + id_exam);
      if (res.data) {
        return res.data.data;
      }
      throw new Error("Unexpected Error !");
    } catch (error) {
      if (error instanceof AxiosError) {
        throw rejectWithValue(error.response?.data);
      }
    }
  }
);

type ScoreInterface = {
  uuid?: string;
  id_exam?: string;
  username?: string;
  name?: string;
  score?: string;
  status?: string;
  create_at?: string;
  updated_at?: string;
};

type InitialState = {
  data: ScoreInterface[];
  isLoading: boolean;
  error: string;
};

const initialState: InitialState = {
  data: [],
  isLoading: false,
  error: "",
};

const scoreSlice = createSlice({
  name: "scoreSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getScore.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getScore.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action?.payload;
        state.error = "";
      })
      .addCase(getScore.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "";
      });
  },
});

export default scoreSlice.reducer;
