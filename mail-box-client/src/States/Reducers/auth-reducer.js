import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:'auth',
    initialState:{userAuth :{idToken:'' , isLogin:false , userID:''}},
    reducers:{
        setAuthantication :(state , action)=>{
           state.userAuth = action.payload ; 
        }
    }
})

const authReducer = authSlice.reducer ;
export const {setAuthantication} = authSlice.actions;
export default authReducer;