import { createSlice } from '@reduxjs/toolkit'
export const mobileSlice = createSlice({
  name: 'isMobile',
  initialState: {
    value: window.innerWidth <= 700,
  },
  reducers: {
    updateBrowserView: (state) => {
        state.value = window.innerWidth <= 700
    }
  },
})

export const { updateBrowserView } = mobileSlice.actions

export default mobileSlice.reducer