import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShow: true,
};

const sidebarHandlerSlice = createSlice({
  name: "sidebarHandlerSlice",
  initialState,
  reducers: {
    hideSidebar: (state) => {
      state.isShow = false;
    },
    showSideBar: (state) => {
      state.isShow = true;
    },
  },
});

export const { hideSidebar, showSideBar } = sidebarHandlerSlice.actions;
export default sidebarHandlerSlice.reducer;
