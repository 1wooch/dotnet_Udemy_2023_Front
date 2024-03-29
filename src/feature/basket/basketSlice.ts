import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Basket } from "../../app/models/Basket";
import agent from "../../app/api/agent";

interface BasketState{
    basket:Basket|null;
    status: string;
}


const initialState:BasketState={
    basket:null,
    status:'idle'
}

export const addBasketItemAsync = createAsyncThunk<Basket,{productId:number,quantity?:number}>(
    //createAsyncThunk accepts two arguments: a string action type and a function that returns a promise
    'basket/addBasketItemAsync',
    async ({productId,quantity=1})=>{
        try{
            return await agent.Basket.addItem(productId,quantity);
        }catch(error){
            console.log(error);
        }
    }
);

export const removeBasketItemAsync = createAsyncThunk<void,{productId:number,quantity?:number}>(
    'basket/removeBasketItemAsync',
    async ({productId,quantity=1})=>{
        try{
            await agent.Basket.removeItem(productId,quantity);
        }catch(error){
            console.log(error);
        }
    }
);

export const basketSlice=createSlice({
    name:'basket',
    initialState,
    reducers:{
        setBasket:(state,action)=>{
            state.basket=action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(addBasketItemAsync.pending,(state,action)=>{
            state.status='pendingAddItem'+action.meta.arg.productId;
        });
        builder.addCase(addBasketItemAsync.fulfilled,(state,action)=>{
            //when it fulfilled (Success)
            state.basket=action.payload;
            state.status='idle';
        });
        builder.addCase(addBasketItemAsync.rejected,(state)=>{
            //when it rejected (Failed)
            state.status='idle';
        });
        builder.addCase(removeBasketItemAsync.pending,(state,action)=>{
            state.status='pendingRemoveItem'+action.meta.arg.productId;
        });
        builder.addCase(removeBasketItemAsync.fulfilled,(state,action)=>{
            const{productId,quantity}=action.meta.arg;
            const itemIndex = state.basket?.items.findIndex(x=>x.productId===productId);
            if(itemIndex === -1 || itemIndex === undefined){
                return;
            }
            state.basket!.items[itemIndex].quantity-=quantity!;
            if(state.basket!.items[itemIndex].quantity<=0){
                state.basket!.items.splice(itemIndex,1);
            }
            state.status='idle';
        });
        builder.addCase(removeBasketItemAsync.rejected,(state)=>{
            state.status='idle';
        });
    }
})

export const {setBasket}=basketSlice.actions;