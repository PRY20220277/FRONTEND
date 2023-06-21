<template>
  <card class="card-user">
    <div slot="image" class="image-container">
      <img :src="user.backgroundImageUrl" alt="avatar" style="height: 250px" />
      <button
        class="edit-button-background"
        @click="goToPublicProfile()"
        style="background-color: black; border-radius: 5px; padding: 0.5rem"
      >
        Editar
      </button>
    </div>
    <div>
      <div class="author">
        <img class="avatar border-white" :src="user.avatarUrl" alt="avatar" />
      </div>
    </div>
    <hr />
    <div class="text-center">
      <div class="row">
        <div class="col-lg-6">
          <h5>
            Publicaciones registradas
            <br />
            <v-btn elevation="0" to="posts">{{ posts }}</v-btn>
          </h5>
        </div>
        <div class="col-lg-6">
          <h5>
            Publicaciones activas
            <br />
            <v-btn elevation="0" to="posts">{{ activePosts }}</v-btn>
          </h5>
        </div>
      </div>
    </div>
  </card>
</template>
<script>
import UserService from "@/services/user.service";
import PostService from "@/services/post.service";
export default {
  data() {
    return {
      user: {
        id: "",
        username: "",
        avatarUrl:
          "https://deepartstorage.blob.core.windows.net/files/user.JPG",
        backgroundImageUrl:
          "https://deepartstorage.blob.core.windows.net/files/34359.jpg",
      },
      previewImage: "",
      previewBackground: "",
      posts: 0,
      activePosts: 0,
    };
  },
  methods: {
    async getUser() {
      await UserService.searchUser(this.currentUser.username)
        .then((response) => {
          const user = response.data;
          this.user.id = user.id;
          this.user.username = user.username;
          if (user.avatarUrl) {
            this.user.avatarUrl = user.avatarUrl;
          }
          if (user.backgroundImageUrl) {
            this.user.backgroundImageUrl = user.backgroundImageUrl;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    goToPublicProfile() {
      this.$router.push(`/profile/${this.currentUser.id}`);
    },
    async getAllPostsByUser() {
      try {
        const response = await PostService.getAllPostsByUserId(
          this.currentUser.id
        );
        if (response) {
          this.posts = response.length;
          this.activePosts = response.filter((x) => x.isPublished).length;
        }
      } catch (error) {
        // this.$notify({
        //   title:
        //     "Ha ocurrido un problema al obtener sus publicaciones. Intentalo nuevamente en unos minutos.",
        //   icon: "fa-solid fa-circle-exclamation",
        //   horizontalAlign: "center",
        //   verticalAlign: "top",
        //   type: "warning",
        // });
        // console.log(error);
      }
    },
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
    this.getUser();
    this.getAllPostsByUser();
  },
};
</script>
<style>
.edit-button-avatar {
  top: 10px;
  right: 10px;
}
.edit-button-background {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
