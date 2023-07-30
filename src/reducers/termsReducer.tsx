import { createSlice } from '@reduxjs/toolkit'
const termsSlice = createSlice({
    name: 'termsVisibility',
    initialState: {
      value: false
    },
    reducers: {
      show: state => {
        state.value = true
      },
      hide: state => {
        state.value = false
      }
    }
  })
export const {show, hide} = termsSlice.actions
export default termsSlice.reducer
