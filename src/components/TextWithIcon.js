import React from "react";

function TextWithIcon({ icon, text, extraStyles }) {
  return (
    <div className="w-full flex items-center text-base font-medium rounded-md text-black bg-white hover:bg-gray-100 px-4 py-2">
      {icon}
      <span className="ml-2">{text}</span>
    </div>
  );
}

export default TextWithIcon;
