import { toeflApi } from "@/lib/axios/axios";
import { QuestionInterface } from "@/lib/interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const getReadingQuestion = createAsyncThunk(
  "readingQuestion/getReadingQuestion",
  async (_, { rejectWithValue }) => {
    try {
      const response = await toeflApi.get("/quests?type=reading");
      if (response.status === 200) {
        return response.data.data;
      }

      throw new Error("Failed to fetch reading questions");
    } catch (error) {
      if (error instanceof AxiosError) {
        throw rejectWithValue(error.response?.data);
      }
      throw rejectWithValue("An unexpected error occurred");
    }
  }
);

export const getReadingQuestionById = createAsyncThunk(
  "readingQuestion/getReadingQuestionById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await toeflApi.get(`/quests?id=${id}`);
      if (response.status === 200) {
        return response.data.data;
      }

      throw new Error("Failed to fetch reading question by ID");
    } catch (error) {
      if (error instanceof AxiosError) {
        throw rejectWithValue(error.response?.data);
      }
      throw rejectWithValue("An unexpected error occurred");
    }
  }
);

export const deleteReadingQuestion = createAsyncThunk(
  "readingQuestion/deleteReadingQuestion",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await toeflApi.delete(`/quests?id=${id}`);
      if (response.status === 200) {
        return id;
      }

      throw new Error("Failed to delete reading question");
    } catch (error) {
      if (error instanceof AxiosError) {
        throw rejectWithValue(error.response?.data);
      }
      throw rejectWithValue("An unexpected error occurred");
    }
  }
);

export const addReadingQuestion = createAsyncThunk(
  "readingQuestion/addReadingQuestion",
  async (data: QuestionInterface, { rejectWithValue }) => {
    try {
      const response = await toeflApi.post("/quests", data);
      if (response.status === 200) {
        return response.data.data;
      }

      throw new Error("Failed to add reading question");
    } catch (error) {
      if (error instanceof AxiosError) {
        throw rejectWithValue(error.response?.data);
      }
      throw rejectWithValue("An unexpected error occurred");
    }
  }
);

export const editReadingQuestion = createAsyncThunk(
  "readingQuestion/editReadingQuestion",
  async (data: QuestionInterface, { rejectWithValue }) => {
    try {
      const response = await toeflApi.post(`/quests?id=${data.uuid}&_method=PATCH`, data);
      if (response.status === 200) {
        return response.data;
      }

      throw new Error("Failed to add reading question");
    } catch (error) {
      if (error instanceof AxiosError) {
        throw rejectWithValue(error.response?.data);
      }
      throw rejectWithValue("An unexpected error occurred");
    }
  }
);

type InitialState = {
  data: QuestionInterface[];
  isLoading: boolean;
  error: string | null;
};

const initialState: InitialState = {
  data: [],
  isLoading: false,
  error: null,
};

const readingQuestionSlice = createSlice({
  name: "readingQuestion",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getReadingQuestion.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getReadingQuestion.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getReadingQuestion.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    builder.addCase(getReadingQuestionById.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getReadingQuestionById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = [action.payload];
    });
    builder.addCase(getReadingQuestionById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    builder.addCase(addReadingQuestion.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addReadingQuestion.fulfilled, (state, action) => {
      state.isLoading = false;
      // state.data = [...state.data, action.payload];
    });
    builder.addCase(addReadingQuestion.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    builder.addCase(deleteReadingQuestion.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteReadingQuestion.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = state.data.filter((item) => item.uuid !== action.payload);
    });

    builder.addCase(deleteReadingQuestion.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    builder.addCase(editReadingQuestion.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(editReadingQuestion.fulfilled, (state, action) => {
      state.isLoading = false;
      // state.data = state.data.map((item) =>
      //   item.uuid === action.payload.uuid ? action.payload : item
      // );
    });
    builder.addCase(editReadingQuestion.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export default readingQuestionSlice.reducer;
