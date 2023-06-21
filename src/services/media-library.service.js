import axios from "./http-common";
import authHeader from "./auth-header";

class MediaLibraryService {
  async generateImages(prompt) {
    const response = await axios.post(
      "/medialibrary/images/generate",
      {
        prompt: prompt,
      },
      { headers: authHeader() }
    );
    return response.data;
  }
  async generateVariations(url) {
    const response = await axios.put(
      "/medialibrary/images/variation",
      {
        url: url,
      },
      { headers: authHeader() }
    );
    return response.data;
  }
  async createMediaLibrary(data) {
    const response = await axios.post("/medialibrary", data, {
      headers: authHeader(),
    });
    return response.data;
  }
  async getMediaLibraryByUser(userId) {
    const response = await axios.get(`/medialibrary/users/${userId}`, {
      headers: authHeader(),
    });
    return response.data;
  }
  async uploadFile(file) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post("/medialibrary/upload/files", formData, {
      headers: authHeader(),
    });
    return response.data;
  }

  async downloadImage(model) {
    const { data } = await axios.post("/medialibrary/download/image", model, {
      headers: authHeader(),
    });
    return data;
  }

  async distortImage(model) {
    const { data } = await axios.post("/medialibrary/distort/image", model, {
      headers: authHeader(),
    });
    return data;
  }
}

export default new MediaLibraryService();
