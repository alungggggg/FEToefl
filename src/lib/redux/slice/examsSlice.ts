import { toeflApi } from "@/lib/axios/axios";
import { ExamsInterface } from "@/lib/interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const getExams = createAsyncThunk(
  "exams/getExams",
  async (_, { rejectWithValue }) => {
    try {
      const response = await toeflApi.get("/exams");
      if (response.status === 200) {
        return response.data.data;
      }

      throw new Error("Failed to fetch exams");
    } catch (error) {
      if (error instanceof AxiosError) {
        throw rejectWithValue(error.response?.data);
      }
      throw rejectWithValue("An unexpected error occurred");
    }
  }
);

export const addExams = createAsyncThunk(
  "exams/addExams",
  async (
    data: {
      name: string;
      access: string;
      expired: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await toeflApi.post("/exams", data);
      if (response.status === 200) {
        return response.data.data;
      }
      throw new Error("Failed to add exams");
    } catch (error) {
      if (error instanceof AxiosError) {
        throw rejectWithValue(error.response?.data);
      }
      throw rejectWithValue("An unexpected error occurred");
    }
  }
);

export const getExamsById = createAsyncThunk(
  "exams/getExamsById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await toeflApi.get(`/exams?id=${id}`);
      if (response.status === 200) {
        return response.data.data;
      }

      throw new Error("Failed to fetch exams by ID");
    } catch (error) {
      if (error instanceof AxiosError) {
        throw rejectWithValue(error.response?.data);
      }

      throw rejectWithValue("An unexpected error occurred");
    }
  }
);

export const editExams = createAsyncThunk(
  "exams/editExams",
  async (
    data: {
      uuid: string;
      name: string;
      access: string;
      expired: string;
      bundler: Array<{ id_quest: string }> | null;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await toeflApi.post(
        `/exams?uuid=${data.uuid}&_method=PATCH`,
        data
      );
      if (response.status === 200) {
        return response.data.data;
      }

      throw new Error("Failed to edit exams");
    } catch (error) {
      if (error instanceof AxiosError) {
        throw rejectWithValue(error.response?.data);
      }
      throw rejectWithValue("An unexpected error occurred");
    }
  }
);

export const deleteExams = createAsyncThunk(
  "exams/deleteExams",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await toeflApi.delete(`/exams?uuid=${id}`);
      if (response.status === 200) {
        return response.data.data;
      }

      throw new Error("Failed to delete exams");
    } catch (error) {
      if (error instanceof AxiosError) {
        throw rejectWithValue(error.response?.data);
      }
      throw rejectWithValue("An unexpected error occurred");
    }
  }
);

type InitialState = {
  data: ExamsInterface[];
  isLoading: boolean;
  error: string | null;
};

const initialState: InitialState = {
  data: [],
  isLoading: false,
  error: null,
};

const examsSlice = createSlice({
  name: "examsSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getExams.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getExams.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getExams.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(addExams.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addExams.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = [...state.data, action.payload];
      })
      .addCase(addExams.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(getExamsById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getExamsById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = [action.payload];
      })
      .addCase(getExamsById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(editExams.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editExams.fulfilled, (state, action) => {
        state.isLoading = false;
        // const index = state.data.findIndex(
        //   (exam) => exam.uuid === action.payload.uuid
        // );
        // if (index !== -1) {
        //   state.data[index] = action.payload;
        // }
      })
      .addCase(editExams.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteExams.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteExams.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.filter((exam) => exam.uuid !== action.payload);
      })
      .addCase(deleteExams.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default examsSlice.reducer;
