
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: false,
    userData: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            const user = action.payload;

            state.status = true;
            state.userData = user
                ? {
                    $id: user.$id,
                    name: user.name,
                    email: user.email,
                }
                : null;
        },

        logout: (state) => {
            state.status = false;
            state.userData = null;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
