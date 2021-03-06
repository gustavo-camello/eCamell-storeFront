import React from "react";

import Footer from "./Footer";
import Header from "./Header";

function MainLayout({ children }) {
  return (
    <div className="dark:bg-gray-900">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default MainLayout;
