import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface LocalState {
  access_token: string | undefined;
  apiUrl: string;
}

export const BASE_URL = 'http://188.40.111.147:8000/api';

const initialState: LocalState = {
  access_token: undefined,
  apiUrl: BASE_URL,
};

const localSlice = createSlice({
  name: 'local',
  initialState,
  reducers: {
    setAccessToken: (
      state,
      action: PayloadAction<LocalState['access_token']>,
    ) => {
      state.access_token = action.payload;
    },
    setApiUrl: (state, action: PayloadAction<LocalState['apiUrl']>) => {
      state.apiUrl = action.payload;
    },
    removeAccessToken: state => {
      state.access_token = undefined;
    },
  },
});

export const {setApiUrl, setAccessToken, removeAccessToken} =
  localSlice.actions;

export default localSlice;
