import Shimmer from "./shimmer";
// import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { MENU_URL } from "../utils/constants";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);
//   const [resInfo, updateResInfo] = useState({
//     name: "",
//     items: null,
//   });
//   const { resId } = useParams();

//   useEffect(() => {
//     fetchMenu();
//   }, [resId]);

// const fetchMenu = async () => {
//   try {
//     const data = await fetch(MENU_URL +"/"+ resId);
//     const json = await data.json();

//     const cards = json?.data?.cards || [];

//     // Extract restaurant name
//     const resCard = cards.find(
//       (c) =>
//         c?.card?.card?.["@type"] ===
//         "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
//     );

//     const restaurantName = resCard?.card?.card?.info?.name || "Restaurant";

//     // Extract recommended items
//     const regularCards =
//       cards.find((card) => card?.groupedCard)?.groupedCard?.cardGroupMap
//         ?.REGULAR?.cards || [];

//     const recommendedCard = regularCards.find(
//       (c) =>
//         c?.card?.card?.["@type"] ===
//           "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" &&
//         c?.card?.card?.title === "Recommended"
//     );

//     const recommendedItems = recommendedCard?.card?.card?.itemCards || [];

//     updateResInfo({
//       name: restaurantName,
//       items: recommendedItems,
//     });
//   } catch (error) {
//     console.error("Error fetching recommended menu:", error);
//   }
// };

return resInfo.items === null ? (
  <Shimmer />
) : (
  <div className="menu-container">
    <h2 className="restaurant-name">{resInfo.name}</h2>

    {resInfo.items.map((item, index) => {
      const { name, description, price, imageId } = item?.card?.info || {};
      return (
        <div className="menu" key={index}>
          <h3>{name}</h3>
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
