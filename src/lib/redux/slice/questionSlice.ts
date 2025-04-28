import { toeflApi } from "@/lib/axios/axios";
import { QuestionInterface } from "@/lib/interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const getQuestion = createAsyncThunk(
  "Question/getQuestion",
  async (type: string | undefined, { rejectWithValue }) => {
    try {
      const response = await toeflApi.get(
        `/quests${type ? `?type=${type}` : ""}`
      );
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

export const getQuestionById = createAsyncThunk(
  "Question/getQuestionById",
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

export const deleteQuestion = createAsyncThunk(
  "Question/deleteQuestion",
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

export const addQuestion = createAsyncThunk(
  "Question/addQuestion",
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

export const addFileQuestion = createAsyncThunk(
  "Question/addFileQuestion",
  async (data: QuestionInterface, { rejectWithValue }) => {
    try {
      const response = await toeflApi.post("/quests", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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

export const editQuestion = createAsyncThunk(
  "Question/editQuestion",
  async (data: QuestionInterface, { rejectWithValue }) => {
    try {
      const response = await toeflApi.post(
        `/quests?id=${data.uuid}&_method=PATCH`,
        data
      );
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

const questionSlice = createSlice({
  name: "Question",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getQuestion.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getQuestion.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getQuestion.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    builder.addCase(getQuestionById.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getQuestionById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = [action.payload];
    });
    builder.addCase(getQuestionById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    builder.addCase(addQuestion.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addQuestion.fulfilled, (state) => {
      state.isLoading = false;
      // state.data = [...state.data, action.payload];
    });
    builder.addCase(addQuestion.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    builder.addCase(deleteQuestion.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteQuestion.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = state.data.filter((item) => item.uuid !== action.payload);
    });

    builder.addCase(deleteQuestion.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    builder.addCase(editQuestion.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(editQuestion.fulfilled, (state) => {
      state.isLoading = false;
      // state.data = state.data.map((item) =>
      //   item.uuid === action.payload.uuid ? action.payload : item
      // );
    });
    builder
      .addCase(editQuestion.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(addFileQuestion.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addFileQuestion.fulfilled, (state) => {
        state.isLoading = false;
        // state.data = [...state.data, action.payload];
      })
      .addCase(addFileQuestion.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default questionSlice.reducer;
