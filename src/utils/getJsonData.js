const JSON_URL = '/data/productList.json';

export async function getJsonData() {
  const response = await fetch(JSON_URL);
  const products = await response.json();

  return products;
}
