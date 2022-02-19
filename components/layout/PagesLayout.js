import React from "react";

import Header from "./Header";

function MainLayout({ children }) {
  return (
    <div>
      <Header />
      <h1>From Page Layouts</h1>
      {children}
    </div>
  );
}

export default MainLayout;
