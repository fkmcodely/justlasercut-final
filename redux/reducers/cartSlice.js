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
            state.items = state.items.push(action.payload);
        },
    }
});

export const { addItem: changeName, deleteItemCart: deleteItem } = cartSlice.actions;

export default cartSlice.reducer;