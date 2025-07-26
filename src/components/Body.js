import { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCards";
import Shimmer from "./shimmer";
import { Link } from "react-router-dom";
import { MENU_URL } from "../utils/constants";
import useStatusOfInternet from "../utils/useStatusOfInternet";
const Body = () => {
  const [restaurantList, updateRestaurantList] = useState([]);
  const [filterdRestaurant, updateFilteredRestaurant] = useState([]);
  // const arr = useState(initialrestaurantList);
  // const restaurantList = arr[0];
  // const updateRestaurantList = arr[1];

  const [inputText, updateInputText] = useState("");
  useEffect(() => {
    fetchData();
  }, []);

  // Here we are fetching the data from api after fetching data we need to update both with
  // new data restaurantList and filteredRestaurant and in searching we will use restaurantList

  const fetchData = async () => {
    try {
      const data = await fetch(MENU_URL);
      const json = await data.json();
      const cardsArray = json?.data?.cards || [];
      const gridCard = cardsArray.find(
        (cardObj) =>
          cardObj?.card?.card?.gridElements?.infoWithStyle?.restaurants
      );

      const restaurants =
        gridCard?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
      updateRestaurantList(restaurants);
      updateFilteredRestaurant(restaurants);
    } catch (error) {}
  };

const statusOfInternet = useStatusOfInternet();
if(statusOfInternet===false){
  return <h1>Looks like you are Offline Please check your internet connection</h1>
}

  return restaurantList.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            onChange={(e) => {
              // whenever chnages in state varible made recat triggers the  re-concilation cycle
              updateInputText(e.target.value);
            }}
            value={inputText}
          />
          <button
            onClick={() => {
              const filterRestaurantList = restaurantList.filter((res) =>
                res.info?.name?.toLowerCase().includes(inputText.toLowerCase())
              );
              updateFilteredRestaurant(filterRestaurantList);
            }}
          >
            Search
          </button>
        </div>
        <button
          onClick={() => {
            const topRatedRestaurant = restaurantList.filter(
              (res) => res.info?.avgRating > 4.1
            );
            updateRestaurantList(topRatedRestaurant);
            updateFilteredRestaurant(topRatedRestaurant);
          }}
          className="filter-btn"
        >
          Top Rated Restaurent
        </button>
      </div>
      <div className="res-container">
        {filterdRestaurant.map((restaurant) => (
         <Link key={restaurant?.info?.id} to={"/restaurants/"+restaurant?.info?.id}><RestaurantCard restaurantData={restaurant} /></Link>
        ))}
      </div>
    </div>
  );
};
/* its recommended that always use unique keys from apis not index always */
export default Body;
