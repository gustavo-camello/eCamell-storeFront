import React from "react";

function formatMoney(amount = 0) {
  const options = {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  };

  const formatter = Intl.NumberFormat("en-IN", options);

  return formatter.format(amount);
}

function DisplayMoney({ amount }) {
  return <span>{formatMoney(amount)}</span>;
}

export default DisplayMoney;
