import React from "react";

function TextWithIcon({ icon, text, extraStyles }) {
  return (
    <div className="items-center text-base font-medium rounded-md text-black hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white px-4 mx-2 py-2 cursor-pointer">
      {icon}
      <span className="ml-2">{text}</span>
    </div>
  );
}

export default TextWithIcon;
