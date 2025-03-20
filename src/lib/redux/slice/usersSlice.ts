import { toeflApi } from "@/lib/axios/axios";
import { UsersInterface, UsersProps } from "@/lib/interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await toeflApi.get("/users");
      if (response.status === 200) {
        return response.data.data;
      }

      throw new Error("Failed to fetch users");
    } catch (error) {
      if (error instanceof AxiosError) {
        throw rejectWithValue(error.response?.data?.message || error.message);
      }
    }
  }
);

export const addUsers = createAsyncThunk(
  "users/addUsers",
  async (data: UsersProps, { rejectWithValue }) => {
    try {
      const response = await toeflApi.post("/users", data);
      if (response.status === 200) {
        return response.data.data;
      }

      throw new Error("Failed to add users");
    } catch (error) {
      if (error instanceof AxiosError) {
        throw rejectWithValue(error.response?.data);
      }
      throw rejectWithValue("An unexpected error occurred");
    }
  }
);

export const deleteUsers = createAsyncThunk(
  "users/deleteUsers",
  async ({ data }: { data: UsersInterface }, { rejectWithValue }) => {
    try {
      const response = await toeflApi.delete(`/users?id=${data?.id}`);
      if (response?.data) {
        return data?.id;
      }

      throw new Error("Failed to delete users");
    } catch (error) {
      if (error instanceof AxiosError) {
        throw rejectWithValue(error?.response?.data);
      }
      throw rejectWithValue("An unexpected error occurred");
    }
  }
);

export const editUsers = createAsyncThunk(
  "users/editUsers",
  async (
    {
      data,
    }: { data: { username: string; name: string; exam: string; id: number } },
    { rejectWithValue }
  ) => {
    try {
      const response = await toeflApi.patch(`/users?id=${data?.id}`, {
        name: data.name,
        username: data.username,
        exam: data.exam,
      });
      if (response?.data) {
        return response?.data;
      }

      throw new Error("Failed to edit users");
    } catch (error) {
      if (error instanceof AxiosError) {
        throw rejectWithValue(error?.response?.data);
      }
      throw rejectWithValue("An unexpected error occurred");
    }
  }
);

type stateInterface = {
  data: UsersInterface[];
  isLoading: boolean;
  error: string | null;
};

const initialState: stateInterface = {
  data: [],
  isLoading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.data = [];
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.data = [];
      })
      .addCase(addUsers.pending, (state, action) => {
        state.isLoading = true;
        // state.data = [];
        state.error = null;
      })
      .addCase(addUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = [...state.data, action.payload];
        state.error = null;
      })
      .addCase(addUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.data = state.data;
        state.error = action.payload as string;
      })
      .addCase(deleteUsers.pending, (state, action) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(deleteUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.filter((e) => e.id != action.payload);
        state.error = "";
      })
      .addCase(deleteUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.data = state.data;
        state.error = action.payload as string;
      })
      .addCase(editUsers.pending, (state, action) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(editUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        const filterData = state.data.filter(
          (e) => e.id != action.payload.data.id
        );
        state.data = [...filterData, action.payload.data];
      })
      .addCase(editUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload as string;
      });
  },
});

export default usersSlice.reducer;
