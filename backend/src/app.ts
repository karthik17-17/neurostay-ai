const API_URL = import.meta.env.VITE_API_URL;

export const api = {
  getBackendStatus: async () => {
    const response = await fetch(`${API_URL}/`);
    return response.text();
  },

  testApi: async () => {
    const response = await fetch(`${API_URL}/api/test`);
    return response.json();
  },

  searchHotels: async (query: string) => {
    const response = await fetch(`${API_URL}/api/hotels/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    return response.json();
  },
};

export default api;