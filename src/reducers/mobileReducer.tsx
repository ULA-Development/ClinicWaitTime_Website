import { createSlice } from '@reduxjs/toolkit'
export const mobileSlice = createSlice({
  name: 'isMobile',
  initialState: {
    value: false,
  },
  reducers: {
    updateBrowserView: (state) => {
        state.value = window.innerWidth <= 530
    }
  },
})

export const { updateBrowserView } = mobileSlice.actions

export default mobileSlice.reducer