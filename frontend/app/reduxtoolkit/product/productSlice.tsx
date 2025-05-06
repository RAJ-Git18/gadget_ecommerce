import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface ProductInterface {
    productid: string;
    name: string;
    price: string;
    stock: string;
    displayas: 'featured' | 'best';
    category: 'mobile' | 'tv' | 'laptop' | 'watch';
    details: string;
    image: string | null;
}

interface ProductState {
    products: ProductInterface[];
    isLoading: boolean;
    error: string | null;
    fetchedProducts: ProductInterface[];
}

const initialState: ProductState = {
    products: [],
    isLoading: false,
    error: null,
    fetchedProducts: [],
};

export const fetchProducts = createAsyncThunk<ProductInterface[]>(
    'product/fetchProducts',
    async () => {
        const response = await axios.get(`${apiUrl}/api/getproducts/`);
        return response.data.message;
    }
);

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.fetchedProducts = action.payload;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || 'Failed to fetch products';
        });
    },
});

export const {} = productSlice.actions
export default productSlice.reducer;
