import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"
const appStore = configureStore({
    // below reducer is responsible to modify our whole app store and this reducer will have
    //  different small reducers for different slices in it . 
    reducer : {
       cart: cartReducer,
    }
});
export default appStore;