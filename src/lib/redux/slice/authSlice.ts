import { toeflApi } from "@/lib/axios/axios";
import { AuthInterface } from "@/lib/interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

type SignInInterface = {
  username: string;
  password: string;
};

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (data: SignInInterface, { rejectWithValue }) => {
    try {
      const response = await toeflApi.post("/auth/sign-in", data);

      if (response.status === 200) {
        await fetch("/api/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: response.data.data.token }),
        });

        localStorage.setItem("is_login", "true");
        return response.data;
      }

      throw new Error("Failed to sign in");
    } catch (error) {
      if (error instanceof AxiosError) {
        throw rejectWithValue(error.response?.data?.message || error.message);
      }
    }
  }
);

export const signOut = createAsyncThunk("auth/signOut", async () => {
  try {
    const response = await toeflApi.get("/auth/sign-out");

    if (response.status === 200) {
      await fetch("/api/auth", {
        method: "DELETE",
      });

      localStorage.setItem("is_login", "false");
      return response.data;
    }

    throw new Error("Failed to sign out");
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data?.message || error.message;
    }
  }
});

type AuthState = {
  data: AuthInterface;
  isLoading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  data: {
    token: null,
    name: null,
  },
  isLoading: false,
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.isLoading = true;
      state.error = "";
      state.data = {
        token: null,
        name: null,
      };
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = "";
      state.data = {
        token: action?.payload?.token || "",
        name: action?.payload?.name || "",
      };
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.isLoading = false;
      state.error = (action?.payload as string) || "";
      state.data = {
        token: null,
        name: null,
      };
    });
    builder.addCase(signOut.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(signOut.fulfilled, (state) => {
      state.isLoading = false;
      state.error = "";
      state.data = {
        token: null,
        name: null,
      };
    });
    builder.addCase(signOut.rejected, (state, action) => {
      state.isLoading = false;
      state.error = (action?.payload as string) || "";
      state.data = {
        token: null,
        name: null,
      };
    });
  },
});

export default authSlice.reducer;
