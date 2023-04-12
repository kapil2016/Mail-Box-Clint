import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Reducers/auth-reducer";

const store = configureStore({
    reducer:{auth:authReducer}
})

export default store ;