export const priceFormatterUSD = (price) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatter.format(price).split(".")[0];
};

export const priceFormatterIDR = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IDR",
  })
    .format(price)
    .split(".")[0];
};
