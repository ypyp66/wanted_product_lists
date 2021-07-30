const JSON_URL = "http://localhost:3000/data/productList.json";

export async function getJsonData() {
    const response = await fetch(JSON_URL);
    const products = await response.json();

    return products;
}
