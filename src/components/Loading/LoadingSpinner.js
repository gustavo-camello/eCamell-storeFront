import React from "react";

function LoadingSpinner() {
  return (
    <div
      style={{ borderTopColor: "transparent" }}
      className="w-10 h-10 border-4 border-blue-600 border-solid rounded-full animate-spin"
    ></div>
  );
}

export default LoadingSpinner;
