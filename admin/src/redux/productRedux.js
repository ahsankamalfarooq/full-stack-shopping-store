import { createSlice } from "@reduxjs/toolkit";



export const productSlice = createSlice({

name : "product",
initialState : {
    products : [],
    isFetching : false,
    error : false,
},
reducers : {
//GET ALL
    getProductStart : (state) => {
        state.isFetching = true
        state.error = false
    },
    getProductSuccess : (state, action) => {
        state.isFetching = true
        state.products = action.payload;
    },
    getProductFailure : (state) => {
        state.error = true
        state.products = true;
    },

    //DELETE
    deleteProductStart : (state) => {
        state.isFetching = true
        state.error = false
    },
    deleteProductSuccess : (state, action) => {
        state.isFetching = true
        state.products.splice(
            state.products.findIndex((item) => item._id === action.payload ), 1
        );
    },
    deleteProductFailure : (state) => {
        state.error = true
        state.products = true;
    },

        //UPDATE
        updateProductStart : (state) => {
            state.isFetching = true
            state.error = false
        },
        updateProductSuccess : (state, action) => {
            state.isFetching = true
            state.products[state.products.findIndex((item) => item._id === action.payload.id )
            ] = action.payload.product
        },
        updateProductFailure : (state) => {
            state.error = true
            state.products = true;
        },

                //Create new Items
                addProductStart : (state) => {
                    state.isFetching = true
                    state.error = false
                },
                addProductSuccess : (state, action) => {
                    state.isFetching = false
                    state.products.push(action.payload)
                },
                addProductFailure : (state) => {
                    state.error = true
                    state.products = true;
                },
    },

});


export const {getProductStart, getProductSuccess, 
    getProductFailure, deleteProductStart, 
    deleteProductSuccess, deleteProductFailure, 
    updateProductFailure, updateProductStart, 
    updateProductSuccess , addProductStart,addProductSuccess, addProductFailure
} = productSlice.actions;

export default productSlice.reducer;

