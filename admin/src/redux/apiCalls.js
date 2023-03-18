import { publicRequest, userRequest } from "../requestMethods";
import { addProductFailure, addProductStart, addProductSuccess, getProductFailure, getProductStart, getProductSuccess, updateProductFailure, updateProductStart, updateProductSuccess } from "./productRedux";
import { loginFailure, loginStart, loginSuccess } from "./userReducer"
import { deleteProductFailure, deleteProductStart, deleteProductSuccess } from "./productRedux";



export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try{
        //user which we will send from login page
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data))
        console.log(res.data)
        // res.data is what we are geting response from our api we the request succeed and error i e res.status().json() in api
        } catch(err) {
        dispatch(loginFailure());
    }
}

export const getProducts = async (dispatch) => {
    dispatch(getProductStart());
    try{
        //user which we will send from login page
        const res = await publicRequest.get("/products");
        dispatch(getProductSuccess(res.data))
        console.log(res.data)
        // res.data is what we are geting response from our api we the request succeed and error i e res.status().json() in api
        } catch(err) {
        dispatch(getProductFailure());
    }
};


export const deleteProducts = async (id, dispatch) => {
    dispatch(deleteProductStart());
    try{
        //user which we will send from login page
        const res = await userRequest.delete(`/products/${id}`);
        dispatch(deleteProductSuccess(id))
        console.log(res.data)
        // res.data is what we are deleteing response from our api we the request succeed and error i e res.status().json() in api
        } catch(err) {
        dispatch(deleteProductFailure());
    }
};
//////////////////////////////////////////////////////////

export const updateProducts = async (product, id ,dispatch) => {
    dispatch(updateProductStart());
    try{
        //user which we will send from login page
        const res = await userRequest.put(`/products/${id}`);
        dispatch(updateProductSuccess({id : id , product : product}))
        console.log(res.data)
        // res.data is what we are updateing response from our api we the request succeed and error i e res.status().json() in api
        } catch(err) {
        dispatch(updateProductFailure());
    }
};

//////////////////////////////////////////////////////////
 
export const addProducts = async (product, dispatch) => {
    dispatch(addProductStart());
    try{
        //user which we will send from login page
        const res = await userRequest.post("/products", product);
        dispatch(addProductSuccess(res.data))
        console.log(res.data)
        // res.data is what we are adding response from our api we the request succeed and error i e res.status().json() in api
        } catch(err) {
        dispatch(addProductFailure());
    }
};