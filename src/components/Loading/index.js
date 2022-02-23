import React from "react";
import LoadingSpinner from "./LoadingSpinner";

function Loading() {
  return (
    <div className="flex flex-col justify-center items-center w-full my-4 px-4">
      <LoadingSpinner />
      <span className="text-base text-black mt-4">Loading...</span>
    </div>
  );
}

export default Loading;
