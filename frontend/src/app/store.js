import {configureStore} from '@reduxjs/toolkit'
import AuthSlice from '../features/auth/AuthSlice'
import UserSlice from '../features/user/UserSlice'

export const store=configureStore({
    reducer:{
        AuthSlice,
        UserSlice,
    }
})