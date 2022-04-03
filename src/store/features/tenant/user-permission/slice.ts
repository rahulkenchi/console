import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userPermissionService } from "../../../../services";
import { IUserPermission } from "../../../../types/index";
import error from "../../../../utils/error";

interface IUserPermissionState {
  data?: IUserPermission[];
  loading: boolean;
  error?: string | null;
}

const initialState: IUserPermissionState = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const userPermission = createAsyncThunk(
  "tenant/user-permissions",
  async (tenantName: string) => {
    try {
      const response = await userPermissionService(tenantName);
      return response.data;
    } catch (error_) {
      return error_;
    }
  }
);

const slice = createSlice({
  name: "permissions",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(userPermission.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userPermission.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(userPermission.rejected, (state, action) => {
      state.loading = false;
      // action.payload contains error information
      state.error = error(action.payload);
    });
  },
});

export default slice.reducer;
