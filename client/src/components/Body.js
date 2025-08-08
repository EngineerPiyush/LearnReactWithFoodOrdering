import { useState, useEffect, useContext } from "react";
import RestaurantCard, { withPromotedLabel } from "./RestaurantCards";
import Shimmer from "./shimmer";
import { Link } from "react-router-dom";
import { MENU_URL } from "../utils/constants";
import useStatusOfInternet from "../utils/useStatusOfInternet";
import UserContext from "../utils/UserContext";

const Body = () => {
  const [restaurantList, updateRestaurantList] = useState([]);
  const [filterdRestaurant, updateFilteredRestaurant] = useState([]);
  const [originalRestaurantList, setOriginalRestaurantList] = useState([]); // ✅ Backup state to preserve full list

  // const arr = useState(initialrestaurantList);
  // const restaurantList = arr[0];
  // const updateRestaurantList = arr[1];

  const [inputText, updateInputText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const { loggedInUser, setUserName } = useContext(UserContext);

  // ✅ Here we are fetching the data from API
  // After fetching, we update all three states:
  // 1. restaurantList → current working list
  // 2. filterdRestaurant → what’s shown on screen
  // 3. originalRestaurantList → backup for filtering/searching later
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

      setOriginalRestaurantList(restaurants); // ✅ Save full list for backup
      updateRestaurantList(restaurants); // ✅ Working list
      updateFilteredRestaurant(restaurants); // ✅ Display list
    } catch (error) {}
  };

  const statusOfInternet = useStatusOfInternet();
  if (statusOfInternet === false) {
    return (
      <h1>Looks like you are Offline Please check your internet connection</h1>
    );
  }

  const CardWithPromotedLabel = withPromotedLabel(RestaurantCard);

  return restaurantList.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            placeholder="Search restaurants..."
            value={inputText}
            onChange={(e) => {
              const text = e.target.value;
              updateInputText(text);

              // ✅ Always filter from originalRestaurantList to avoid losing full data
              const filtered = originalRestaurantList.filter((res) =>
                res.info?.name?.toLowerCase().includes(text.toLowerCase())
              );
              updateFilteredRestaurant(filtered);
            }}
          />
        </div>
        <div className="userName">
          <label htmlFor="userName">UserName : </label>
          <input
            id="userName"
            type="text"
            value={loggedInUser}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </div>
        <button
          onClick={() => {
            // ✅ Filter top-rated from originalRestaurantList to keep backup safe
            const topRatedRestaurant = originalRestaurantList.filter(
              (res) => res.info?.avgRating > 4.1
            );
            updateRestaurantList(topRatedRestaurant);
            updateFilteredRestaurant(topRatedRestaurant);
          }}
          className="filter-btn"
        >
          Click to get Top Rated
        </button>
      </div>
      <div className="res-container">
        {filterdRestaurant.map((restaurant) => (
          <Link
            key={restaurant?.info?.id}
            to={"/restaurants/" + restaurant?.info?.id}
          >
            {/* ✅ Use promoted label if rating > 4.3 */}
            {restaurant?.info?.avgRating > 4.3 ? (
              <CardWithPromotedLabel restaurantData={restaurant} />
            ) : (
              <RestaurantCard restaurantData={restaurant} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

/* ✅ It's recommended that always use unique keys from APIs, not index always */
export default Body;
