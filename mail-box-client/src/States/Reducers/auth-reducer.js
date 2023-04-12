import { createSlice } from "@reduxjs/toolkit";
const idToken = localStorage.getItem('idToken') ? localStorage.getItem('idToken') : '' ;
const userIsLogin = !!idToken ;
const userID = localStorage.getItem('userID') ? localStorage.getItem('userID') : '' ;

const authSlice = createSlice({
    name:'auth',
    initialState:{userAuth :{idToken: idToken , isLogin:userIsLogin , userID:userID}},
    reducers:{
        setAuthantication :(state , action)=>{
           state.userAuth = action.payload ; 
        }
    }
})

const authReducer = authSlice.reducer ;
export const {setAuthantication} = authSlice.actions;
export default authReducer;