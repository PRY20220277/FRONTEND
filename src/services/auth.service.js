import axios from "./http-common";

class AuthService {
  async login(user) {
    const response = await axios.post("/users/authenticate", {
      username: user.username,
      password: user.password,
    });

    if (response.data.access_token) {
      sessionStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  }

  logout() {
    sessionStorage.removeItem("user");
  }
}

export default new AuthService();
