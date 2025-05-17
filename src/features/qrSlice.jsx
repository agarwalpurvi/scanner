
import { createSlice } from '@reduxjs/toolkit';

const qrSlice = createSlice({
  name: 'qr',
  initialState: {
    urls: [],
  },
  reducers: {
    saveUrl: (state, action) => {
      state.urls.push(action.payload);
    },
  },
});

export const { saveUrl } = qrSlice.actions;
export default qrSlice.reducer;

