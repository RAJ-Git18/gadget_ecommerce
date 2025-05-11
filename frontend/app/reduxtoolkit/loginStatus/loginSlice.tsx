import { createSlice } from "@reduxjs/toolkit"


interface LoginInterfae {
    isloggedIn: boolean
}

const initialState: LoginInterfae = {
    isloggedIn: typeof window !== 'undefined' ? localStorage.getItem('status') === 'true' : false,
}


const loginSlice = createSlice({
    name: 'login',
    initialState: initialState,
    reducers: {
        showLogout: (state) => {
            state.isloggedIn = true;
            localStorage.setItem('status', 'true')
        },
        showLogin: (state) => {
            state.isloggedIn = false;
            localStorage.setItem('status', 'false')

        }
    }
})

export const { showLogin, showLogout } = loginSlice.actions
export default loginSlice.reducer