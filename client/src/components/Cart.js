import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import { clearCart } from "../utils/cartSlice";
const Cart = ()=> {
    const cartItems = useSelector((store)=> store.cart.items);
    const dispatch = useDispatch();
    return(
        <div className="cart">
        <button className="cart-button" onClick={()=>dispatch(clearCart())}>
            Clear Cart
        </button>
            {cartItems.length===0 ? (<h4>
                Your cart is empty please add desired items to place an order .
            </h4>) :<ItemList items={cartItems} showRemove={true}/>}
        </div>
    )
}
export default Cart;