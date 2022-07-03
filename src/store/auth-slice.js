import { createSlice } from "@reduxjs/toolkit";
const id = localStorage.getItem('id');
const email = localStorage.getItem('email');
const token = localStorage.getItem('token');
const initialState = { id, email, token };
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // commit(state, action) {
        //     state.user = action.payload.user;
        //     state.token = action.payload.token;
        //     localStorage.setItem('token', action.payload.token);
        // },
        commit(state, action) {
            localStorage.setItem('id', action.payload.id);
            localStorage.setItem('email', action.payload.email);
            localStorage.setItem('token', action.payload.token);
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.token = action.payload.token;
        },
        signOut(state) {
            state.id = null;
            state.email = null;
            state.token = null;
            localStorage.removeItem('id');
            localStorage.removeItem('email');
            localStorage.removeItem('token');
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice;