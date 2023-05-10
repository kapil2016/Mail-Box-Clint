import { createSlice } from "@reduxjs/toolkit";
const idToken = localStorage.getItem('idToken') 

const userID = localStorage.getItem('userID') 
const email = localStorage.getItem('email')



const authSlice = createSlice({
    name:'auth',
    initialState:{userAuth :{idToken: idToken , isLogin:!!idToken, userID:userID , email:email}},
    reducers:{
        setAuthantication :(state , action)=>{
           state.userAuth = action.payload ; 
        }
    }
})

const authReducer = authSlice.reducer ;
export const {setAuthantication} = authSlice.actions;
export default authReducer;