import React from "react";
import { InlineShareButtons } from "sharethis-reactjs";

function ShareProduct({ product }) {
  return (
    <div>
      <InlineShareButtons
        config={{
          alignment: "left", // alignment of buttons (left, center, right)
          color: "social", // set the color of buttons (social, white)
          enabled: true, // show/hide buttons (true, false)
          font_size: 12, // font size for the buttons
          labels: "cta", // button labels (cta, counts, null)
          language: "en", // which language to use (see LANGUAGES)
          networks: [
            // which networks to include (see SHARING NETWORKS)
            "facebook",
            "whatsapp",
            "twitter",
            "messenger",
            "pinterest",
          ],
          padding: 12, // padding within buttons (INTEGER)
          radius: 4, // the corner radius on each button (INTEGER)
          show_total: false,
          size: 30, // the size of each button (INTEGER)
          title: product?.name, // (defaults to og:title or twitter:title)
        }}
      />
    </div>
  );
}

export default ShareProduct;
