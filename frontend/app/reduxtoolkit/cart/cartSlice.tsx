import { createSlice, nanoid } from "@reduxjs/toolkit";

const storedCartCount = typeof window !== 'undefined' ?
    parseInt(localStorage.getItem('cartcount') || '0') :
    0;

const initialCartState = {
    cartCount: storedCartCount,
}


const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        cartIncrement: (state) => {
            state.cartCount += 1
            localStorage.setItem('cartcount', state.cartCount.toString())
        },
        cartDecrement: (state) => {
            if (state.cartCount > 0) {
                state.cartCount -= 1
                localStorage.setItem('cartcount', state.cartCount.toString())
            }
        },
        cartDecrementByAmount: (state, action) => {
            state.cartCount = state.cartCount - action.payload
            if (state.cartCount < 0) {
                state.cartCount = 0
            }
            localStorage.setItem('cartcount', state.cartCount.toString())

        },
        cartReset: (state, action) => {
            console.log(action.payload)
            state.cartCount = action.payload
            localStorage.setItem('cartcount', state.cartCount.toString())
        }
    }
})


export const { cartIncrement, cartDecrement, cartDecrementByAmount, cartReset } = cartSlice.actions
export default cartSlice.reducer