export const loadFromStorage = (key) => {
    try {
      return JSON.parse(localStorage.getItem(key)) || [];
    } catch {
      return [];
    }
  };
  
  export const saveToStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };