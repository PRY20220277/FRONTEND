import http from "./http-common";
import authHeader from "./auth-header";

class UserService {
  async createUser(data) {
    return await http.post(`/users`, data);
  }
  async searchUser(username) {
    return await http.get(`/users/username/${username}`);
  }
  async getUser(userId) {
    const { data } = await http.get(`/users/${userId}`);
    return data;
  }
  async updateUser(id, data) {
    return await http.put(`/users/${id}`, data, { headers: authHeader() });
  }
  async updateAvatar(file) {
    const formData = new FormData();
    formData.append("file", file);

    return await http.patch(`/users/update/image/avatar`, formData, {
      headers: authHeader(),
    });
  }
  async updateBackground(file) {
    const formData = new FormData();
    formData.append("file", file);

    return await http.patch(`/users/update/image/background`, formData, {
      headers: authHeader(),
    });
  }
  async resetPassword(model) {
    return await http.patch("/users/reset/password", model);
  }
}

export default new UserService();
