import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LocalState {
  access_token: string | undefined;
  refresh_token: string | undefined;

  apiUrl: string;
  role: string | undefined;
  name: string | undefined;
  user_id: string | undefined;
  username: string | undefined;
  phone: string | undefined;
  email: string | undefined;
}

export const BASE_URL = "https://xlixraxxtbfbafdugdiy.supabase.co/functions/v1";

const initialState: LocalState = {
  access_token: undefined,

  refresh_token: undefined,
  apiUrl: BASE_URL,
  role: "consumer",
  user_id: undefined,
  name: undefined,
  phone: undefined,
  username: undefined,
  email: undefined,
};

const localSlice = createSlice({
  name: "local",
  initialState,
  reducers: {
    setAccessToken: (
      state,
      action: PayloadAction<LocalState["access_token"]>
    ) => {
      state.access_token = action.payload;
    },
    setRefreshToken: (
      state,
      action: PayloadAction<LocalState["refresh_token"]>
    ) => {
      state.refresh_token = action.payload;
    },
    setApiUrl: (state, action: PayloadAction<LocalState["apiUrl"]>) => {
      state.apiUrl = action.payload;
    },
    removeAccessToken: (state) => {
      state.access_token = undefined;
      state.name = undefined;
      state.role = "consumer";
    },
    setRole: (state, action: PayloadAction<LocalState["role"]>) => {
      state.role = action.payload;
    },
    setName: (state, action: PayloadAction<LocalState["name"]>) => {
      state.name = action.payload;
    },
    setPhone: (state, action: PayloadAction<LocalState["phone"]>) => {
      state.phone = action.payload;
    },
    setUsername: (state, action: PayloadAction<LocalState["username"]>) => {
      state.username = action.payload;
    },
    setEmail: (state, action: PayloadAction<LocalState["email"]>) => {
      state.email = action.payload;
    },
    setUserId: (state, action: PayloadAction<LocalState["user_id"]>) => {
      state.user_id = action.payload;
    },
  },
});

export const {
  setApiUrl,
  setAccessToken,
  setRefreshToken,
  removeAccessToken,
  setRole,
  setUserId,
  setName,
  setEmail,
  setPhone,
  setUsername,
} = localSlice.actions;

export default localSlice;
