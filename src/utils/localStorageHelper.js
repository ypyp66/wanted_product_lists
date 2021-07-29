export const localStorageHelper = {
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
  // NOTE: stringify 할 때 비어있는거 조심할것
  setItem: (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  },
};
