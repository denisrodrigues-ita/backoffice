const url = process.env.BASE_URL;

const apiAuth = {
  async loginUser(
    email: string,
    password: string,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    try {
      setIsLoading(true);
      const response: Response = await fetch(`${url}/authenticate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        return { result: null, response };
      }
      const result = await response.json();
      return { result, response };
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  },
};

export default apiAuth;
