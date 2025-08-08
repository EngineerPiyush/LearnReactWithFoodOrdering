import { CDN_URL } from "../utils/constants";
// import {useContext} from "react";
// import UserContext from "../utils/UserContext";

const RestaurantCard = (props) => {
  // const {loggedInUser} = useContext(UserContext);
  const { restaurantData } = props;
  const { name, cuisines, avgRating, costForTwo, cloudinaryImageId } =
    restaurantData?.info;
  return (
    <div
      className="res-card"
      style={{
        backgroundColor: "#cecece",
      }}
    >
      <img
        className="card-image"
        src={CDN_URL + cloudinaryImageId}
        alt="card-image"
      />
      <div className="card-info">
        <h3>{name}</h3>
        <h4>{cuisines.join(",")}</h4>
        <h4>{avgRating}</h4>
        <h4>{costForTwo}</h4>
        {/* <h4>User : {loggedInUser}</h4> */}
      </div>
    </div>
  );
};

export default RestaurantCard;

export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label className="promoted">Promoted</label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};
