import {configureStore} from '@reduxjs/toolkit'
import authSliceReducer from './AuthSlice'

export const store = configureStore({
    reducer : {
        authSliceReducer
    }
})