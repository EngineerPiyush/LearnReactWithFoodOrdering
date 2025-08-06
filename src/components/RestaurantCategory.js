// import { useState } from "react";
import ItemList from "./ItemList";

const RestaurantCategory = ({ data, showItems, setShowIndex }) => {
  const { title, items } = data;
  //   const [showItems, setShowItems] = useState(false);
  const handleClick = () => {
    // setShowItems(!showItems);
    setShowIndex();
  };

  return (
    <div className="category">
      <div className="category-header" onClick={handleClick}>
        <span>
          {title}({data.items.length})
        </span>
        <span style={{
            display: 'inline-block',
            transform: showItems ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
          }}>▼</span>
      </div>
      {showItems && <ItemList items={items} />}
    </div>
  );
};

export default RestaurantCategory;
