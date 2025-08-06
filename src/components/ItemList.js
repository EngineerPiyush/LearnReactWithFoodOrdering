import { useDispatch } from "react-redux";
import {addItem} from "../utils/cartSlice";
const ItemList = ({ items }) => {
const dispatch = useDispatch();
  const handleAddItem = (item) => {
    // Dispatch an action
    dispatch(addItem(item))
  }
  return (
    <div className="category-items">
      {items.map((item, idx) => {
        const { name, description, price, imageId } = item?.card?.info || {};
        return (
          <div className="menu" key={idx}>
            <div className="menu-description">
              <h3>{name}</h3>
              <p>{description}</p>
              <p>₹{price / 100}</p>
            </div>
            <div className="menu-image">
              <button onClick={()=>handleAddItem(item)}>Add +</button>
              {imageId && (
                <img
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/${imageId}`}
                  alt={name}
                  width="150"
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default ItemList;
