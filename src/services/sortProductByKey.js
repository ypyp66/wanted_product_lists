import SORT_KEY from 'constants/sortKey.js';

const sortProductByKey = (products, key) => {
  const filter = {
    [SORT_KEY.RECENT]: () => products.reverse(),
    [SORT_KEY.LOW_PRICE]: () => products.sort((a, b) => a.price - b.price),
  };
  return filter[key]();
};

export { sortProductByKey };
