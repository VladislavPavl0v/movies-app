import React from "react";
import PropTypes from "prop-types";
import { Rate } from "antd";
import "./give-rating.css";

function GiveRating({ movieId, rateData }) {
  const rateStyle = { fontSize: 16 };
  const rateClick = (value) => {
    if (typeof rateData === "function") {
      rateData(value, movieId);
    }
  };

  return <Rate style={rateStyle} count={10} allowClear={false} allowHalf onChange={rateClick} />;
}
GiveRating.propTypes = {
  movieId: PropTypes.number.isRequired,
  rateData: PropTypes.func.isRequired,
};
GiveRating.defaultProps = {
  movieId: 0,
  rateData: () => {},
};
export default GiveRating;
