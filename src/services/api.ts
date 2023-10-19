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
      const result = await response.json();
      return { response, result };
    } catch (error) {
      return {};
    } finally {
      setIsLoading(false);
    }
  },
};

export default api;
