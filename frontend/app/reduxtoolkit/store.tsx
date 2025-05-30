import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cart/cartSlice'
import productReducer from './product/productSlice'
import loginReducer from './loginStatus/loginSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      product: productReducer,
      login: loginReducer,
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']