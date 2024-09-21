import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import exp from "constants";
import { stat } from "fs";

export interface CartItem{
    id: number;
    title: string;
    price: number;
    category: string;
    image: string;
    rating:{
        rate: number;
        count: number;
    };
    quantity:number;
}

interface carState{
    items: CartItem[];
}

const initialState: carState={
    items:[],
};

const cartSlice= createSlice({
    name:'cart',
    initialState,
    reducers:{
        addItem:(state,action: PayloadAction<Omit<CartItem,"quantity">>)=>{
            const existingItem = state.items.find(
                (item) => item.id === action.payload.id
            );
            if(existingItem){
                existingItem.quantity +=1;
            }else{
                state.items.push({ ...action.payload, quantity:1})
            }

        },
        removeItem:(state,action: PayloadAction<{id:number}>)=>{
            const existingItem = state.items.find(
                (item) => item.id === action.payload.id
            );
            if(existingItem){
                if(existingItem.quantity>1){
                    existingItem.quantity-=1;
                }else{
                    state.items = state.items.filter(
                        (item) => item.id !=action.payload.id
                    );
                }
            }
        },
        clearCart:(state)=>{
            state.items=[];
        },
    },
});

export const{addItem, clearCart, removeItem}= cartSlice.actions;
export default cartSlice.reducer;