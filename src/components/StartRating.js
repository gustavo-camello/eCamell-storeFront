import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { faStar as EmptyStar } from "@fortawesome/free-regular-svg-icons";

function StarRating({ rating }) {
  if (!rating) return "No data";

  rating = parseFloat(rating);

  const total = 5;
  let stars = [];

  // Fill with full stars up to rating int floor.
  for (let i = 0; i < Math.floor(rating); i++) {
    stars.push(
      <span className="text-yellow-300">
        <FontAwesomeIcon icon={faStar} key={stars.length} />
      </span>
    );
  }

  // If there's a remainder larger than or equals to 0.25, add a half star.
  if (rating % 1 >= 0.25) {
    stars.push(
      <span className="text-yellow-300">
        <FontAwesomeIcon icon={faStarHalfStroke} key={stars.length} />
      </span>
    );
  }

  // Pad the remaining with hollow stars.
  const remaining = total - stars.length;

  for (let i = 0; i < remaining; i++) {
    stars.push(
      <span className="text-yellow-300">
        <FontAwesomeIcon icon={EmptyStar} key={stars.length} />
      </span>
    );
  }

  return (
    <span style={{ cursor: "pointer" }} title={`${rating.toFixed(2)} stars`}>
      {stars}
    </span>
  );
}

export default StarRating;
