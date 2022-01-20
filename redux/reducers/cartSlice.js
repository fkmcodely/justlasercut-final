import { createSlice } from "@reduxjs/toolkit";
const { v4: uuidv4 } = require('uuid');

const initialState = {
    id: uuidv4(),
    items: []
}

export const cartSlice = createSlice({
    name: 'configuration',
    initialState,
    reducers: {
        addItem: (state, action) => {
            state.items = [...state.items, action.payload];
        },
        deleteItem: (state, action) => {
            state.items = state.items.filter(item => item.idProjectItem !== action.payload);
        },
        setMaterial: (state, action) => {
            state.items = state.items.map( item => {
                if(item.idProjectItem === action.payload.itemId) {
                    item.material = action.payload.material
                };
                return item
            })
        },
        setGrosor: (state, action) => {
            state.items = state.items.map( item => {
                if(item.idProjectItem === action.payload.itemId) {
                    item.weight = action.payload.weight
                };
                return item
            })
        },
    }
});

export const { 
    addItem: addItem, 
    deleteItem: deleteItem, 
    setMaterial: setMaterial,
    setGrosor: setGrosor 
} = cartSlice.actions;

export default cartSlice.reducer;