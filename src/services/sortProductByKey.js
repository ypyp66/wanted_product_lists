const sortProductByKey = (products, key) => {
  const filter = {
    '': () => products,
    recent: () => products.reverse(),
    lowPrice: () => products.sort((a, b) => a.price - b.price),
  };
  return key ? filter[key]() : filter['recent'];
};

export { sortProductByKey };
