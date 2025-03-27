import { createSlice } from "@reduxjs/toolkit";

const unautorizeDialogSlice = createSlice({
    name: "unautorizeDialog",
    initialState: {
        isShow: false
    },
    reducers: {
        showDialog: (state) => {
            state.isShow = true;
        },
        hideDialog: (state) => {
            state.isShow = false;
        }
    }
});

export const { showDialog, hideDialog } = unautorizeDialogSlice.actions;
export default unautorizeDialogSlice.reducer;
