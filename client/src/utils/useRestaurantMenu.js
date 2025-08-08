import { MENU_URL } from "./constants";
import { useState, useEffect } from "react";
const useRestaurantMenu = (resId) => {
  const [resInfo, updateResInfo] = useState({
    name: "",
    categories: [],
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

      // Extract all item categories
      const regularCards =
        cards.find((card) => card?.groupedCard)?.groupedCard?.cardGroupMap
          ?.REGULAR?.cards || [];

      const itemCategories = regularCards
        .filter(
          (c) =>
            c?.card?.card?.["@type"] ===
            "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
        )
        .map((c) => ({
          title: c.card.card.title,
          items: c.card.card.itemCards,
        }));

      updateResInfo({
        name: restaurantName,
        categories: itemCategories,
      });
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  return resInfo;
};
export default useRestaurantMenu;
