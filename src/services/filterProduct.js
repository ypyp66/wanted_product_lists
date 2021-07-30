import * as LSWorker from 'services/localStorageWorker';

const filterByBrand = (products, brandList) => {
  if (!brandList.length) return products;
  return products.filter(product => brandList.includes(product.brand));
};

const filterNotInterested = (products, isChecked) => {
  if (!isChecked) return products;
  const notInterested = LSWorker.getNotInterested();
  return products.filter(product => !notInterested.includes(product.id));
};

const filterProduct = (products, isChecked, brandLists) => {
  return filterNotInterested(filterByBrand(products, brandLists), isChecked);
};

export { filterProduct };
