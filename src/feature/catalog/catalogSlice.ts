import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../app/models/Product";
import agent from "../../app/api/agent";

const productsAdapter = createEntityAdapter<Product>()

export const fetchProductsAsync = createAsyncThunk<Product[]>(
    'catalog/fetchProductsAsync',
    async()=>{
        try{
            return await agent.Catalog.list();
        }catch(error){
            console.log(error)
        }
    }
)

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productsAdapter.getInitialState({
        loading: 'idle',
        error: null
    }),
    reducers: {},
    extraReducers: (builder=>{
        builder.addCase(fetchProductsAsync.pending, (state)=>{
            state.loading = 'loading'
        });
        builder.addCase(fetchProductsAsync.fulfilled, (state, action)=>{
            state.loading = 'idle';
            productsAdapter.setAll(state, action.payload);
            
        });

        builder.addCase(fetchProductsAsync.rejected, (state, action)=>{
            state.loading = 'idle';
        })
    })
})