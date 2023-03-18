import { publicRequest } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess } from "./userRedux"




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