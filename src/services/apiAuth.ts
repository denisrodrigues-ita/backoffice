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

  async userVerify(token: string | null) {
    try {
      const formatedToken = token?.replace(/["']/g, "");
      const response: Response = await fetch(`${url}/user-verify`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${formatedToken}`,
        },
      });

      if (!response.ok) {
        return { result: null, response };
      }
      const result = await response.json();

      return { result, response };
    } catch (error) {
      throw error;
    }
  },

  async firstAccess(
    id: number,
    password: string,
    newPassword: string,
    confirmPassword: string,
    token: string
  ) {
    try {
      const response: Response = await fetch(`${url}/engaged/password/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password, newPassword, confirmPassword }),
      });

      if (!response.ok) {
        return { result: null, response };
      }
      const result = await response.json();

      return { result, response };
    } catch (error) {
      throw error;
    }
  },
};

export default apiAuth;
