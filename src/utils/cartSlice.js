import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
      //   note that we are mutating the state here means we are directly modifying the state
    },
    removeItem: (state) => {
      // the callback also has access action as a second parameter but we do not need right
      // now whereever so i have not kept it there .
      state.items.pop();
    },
    clearCart: (state) => {
      // state.items.length = 0; // [] this will empty the array
      // state =[] it will not work thats why we have used above method
      return { items: []};
    },
  },
});
export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

/* what will happen behind the scene ? this createSlice function will return an object 
{
        actions:{
          addItem,
          removeItem,
          clearCart
        } ,
        reducer:
}
    and that is what i am exporting from here
*/
