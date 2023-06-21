import axios from "./http-common";
import authHeader from "./auth-header";

class PostService {
  async getAllPosts() {
    const { data } = await axios.get(`/posts`);
    return data;
  }
  async searchPost(model) {
    const { data } = await axios.post("/posts/search", model);
    return data;
  }
  async getAllPostsByUserId(userId) {
    const { data } = await axios.get(`/posts/user/${userId}`, {
      headers: authHeader(),
    });
    return data;
  }
  async create(model) {
    const { data } = await axios.post("/posts", model, {
      headers: authHeader(),
    });
    return data;
  }
  async getPostById(postId) {
    const { data } = await axios.get(`/posts/${postId}`, {
      headers: authHeader(),
    });
    return data;
  }
  async updatePost(postId, model) {
    const { data } = await axios.put(`/posts/${postId}`, model, {
      headers: authHeader(),
    });
    return data;
  }
}

export default new PostService();
