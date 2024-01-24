const url = process.env.BASE_URL;

const apiEngaged = {
  async createEngaged(
    engaged: {
      password: string;
      confirmPassword: string;
      groomName: string;
      brideName: string;
      email: string;
    },
    token: string
  ) {
    try {
      const response: Response = await fetch(`${url}/engaged`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ engaged }),
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

  async getEngageds(token: string) {
    try {
      const response: Response = await fetch(`${url}/engaged`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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
};

export default apiEngaged;
