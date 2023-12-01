const url = process.env.BASE_URL;

const apiAuth = {
  async loginUser(email: string, password: string) {
    try {
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
    }
  },

  async userVerify(token: string | null) {
    try {
      const response: Response = await fetch(`${url}/user-verify`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
    password: string,
    newPassword: string,
    confirmPassword: string,
    token: string
  ) {
    try {
      const response: Response = await fetch(`${url}/engaged/password/change`, {
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
