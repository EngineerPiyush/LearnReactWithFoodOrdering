import Shimmer from "./shimmer";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const RestaurantMenu = () => {
  const [resInfo, updateResInfo] = useState(null);
  const { resId } = useParams();

  useEffect(() => {
    fetchMenu();
  }, [resId]);

  const fetchMenu = async () => {
    try {
      const data = await fetch(`http://localhost:3001/restaurants/${resId}`);
      const json = await data.json();

      const regularCards =
        json?.data?.cards?.find((card) => card?.groupedCard)?.groupedCard
          ?.cardGroupMap?.REGULAR?.cards || [];

      const recommendedCard = regularCards.find(
        (c) =>
          c?.card?.card?.["@type"] ===
            "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" &&
          c?.card?.card?.title === "Recommended"
      );

      if (!recommendedCard) {
        console.warn("No recommended section found.");
        updateResInfo([]);
        return;
      }

      const recommendedItems = recommendedCard?.card?.card?.itemCards || [];

      updateResInfo(recommendedItems);
    } catch (error) {
      console.error("Error fetching recommended menu:", error);
    }
  };

  return resInfo === null ? (
    <Shimmer />
  ) : (
    <div className="menu-container">
      {resInfo.map((item, index) => {
        const { name, description, price, imageId } = item?.card?.info || {};
        return (
          <div className="menu" key={index}>
            <h1>{name}</h1>
            <p>{description}</p>
            <p>₹{price / 100}</p>
            {imageId && (
              <img
                src={`https://media-assets.swiggy.com/swiggy/image/upload/${imageId}`}
                alt={name}
                width="150"
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
export default RestaurantMenu;
