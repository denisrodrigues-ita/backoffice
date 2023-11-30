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
    token: string,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  },
};

export default apiEngaged;
