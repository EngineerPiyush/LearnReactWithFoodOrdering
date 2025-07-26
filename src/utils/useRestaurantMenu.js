import { MENU_URL } from "./constants";
import { useState, useEffect } from "react";
const useRestaurantMenu = (resId) => {
  const [resInfo, updateResInfo] = useState({
    name: "",
    items: null,
  });
  useEffect(() => {
    fetchData();
  }, [resId]);
  const fetchData = async () => {
    try {
      const data = await fetch(MENU_URL + resId);
      const json = await data.json();
      const cards = json?.data?.cards || [];

      // Extract restaurant name
      const resCard = cards.find(
        (c) =>
          c?.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
      );

      const restaurantName = resCard?.card?.card?.info?.name || "Restaurant";

      // Extract recommended items
      const regularCards =
        cards.find((card) => card?.groupedCard)?.groupedCard?.cardGroupMap
          ?.REGULAR?.cards || [];

      const recommendedCard = regularCards.find(
        (c) =>
          c?.card?.card?.["@type"] ===
            "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" &&
          c?.card?.card?.title === "Recommended"
      );

      const recommendedItems = recommendedCard?.card?.card?.itemCards || [];

      updateResInfo({
        name: restaurantName,
        items: recommendedItems,
      });
    } catch (error) {
      console.error("Error fetching recommended menu:", error);
    }
  };
  return resInfo;
};
export default useRestaurantMenu;
