import axios from "axios";



const BASE_URL = "http://localhost:3001/api/"
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZjcyNDAyNjQzODRmZjcwMjgzNzEwMCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3ODM5MzIzOCwiZXhwIjoxNjc4NjUyNDM4fQ.01OAvAMTY8mPfuPS2fAeWTlPdjhxtc3TADak4Gogt9Y"
// JSON.parse(JSON.parse(localStorage.getItem("persist:root"))
// .user
// )
// .currentUser.accessToken;


export const publicRequest = axios.create({
    baseURL : BASE_URL,

});

export const userRequest = axios.create({
    baseURL : BASE_URL,
    headers : {token : `Bearer ${TOKEN}`
}

});