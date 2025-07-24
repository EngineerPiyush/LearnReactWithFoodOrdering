import { CDN_URL } from "../utils/constants";
const RestaurantCard = (props) => {
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
      </div>
    </div>
  );
};

export default RestaurantCard;
