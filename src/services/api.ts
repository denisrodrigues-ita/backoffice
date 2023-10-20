const BASE_URL = "http://localhost:3001/guests";

const api = {
  async getGuests(
    engaged_id: number,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/${engaged_id}`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      return { response, result };
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  },
};

export default api;
