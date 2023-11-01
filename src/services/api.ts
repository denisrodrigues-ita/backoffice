const BASE_URL = "http://localhost:3001/guests";

const api = {
  async getGuests(
    engaged_id: number,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    try {
      setIsLoading(true);
      const response: Response = await fetch(`${BASE_URL}/${engaged_id}`, {
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

  async createGuest(data: any) {
    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      return { response, result };
    } catch (error) {
      throw error;
    }
  },

  async changeStatusGuest(code: string, status: boolean) {
    try {
      const response = await fetch(`${BASE_URL}/${code}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ attendance_status: status }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  },

  async changeGuestName(code: string, newName: string) {
    try {
      const response = await fetch(`${BASE_URL}/${code}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newName }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  },
};

export default api;
