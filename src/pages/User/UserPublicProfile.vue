<template>
  <card class="card-user" style="max-width: 1000px; margin: auto">
    <div slot="image" class="image-container">
      <img
        :src="user.backgroundImageUrl"
        alt="background"
        style="height: 250px"
      />
      <button
        v-if="currentUser.id == userId"
        class="edit-button-background"
        @click="showBackgroundInput()"
        style="background-color: black; border-radius: 5px; padding: 0.5rem"
      >
        Editar
      </button>
      <input
        type="file"
        accept="image/png,image/jpg,image/jpeg,image/webp"
        ref="fileBackgroundInput"
        @change="editBackground"
        style="display: none"
      />
    </div>
    <div>
      <div class="author">
        <img class="avatar border-white" :src="user.avatarUrl" alt="avatar" />
        <button
          v-if="currentUser.id == userId"
          class="edit-button-avatar"
          @click="showAvatarInput()"
        >
          Editar
        </button>
        <input
          type="file"
          accept="image/png,image/jpg,image/jpeg,image/webp"
          ref="fileAvatarInput"
          @change="editAvatar"
          style="display: none"
        />
      </div>
      <div style="text-align: center; margin-left: -2.5rem">
        <h4 class="title" style="margin-top: 0rem">
          {{ user.username }}
        </h4>
      </div>
    </div>
    <hr />
    <div class="text-center mt-3">
      <v-container>
        <v-row justify="center">
          <v-col
            v-for="(post, index) in activePosts"
            :key="index"
            cols="auto"
            style="margin: auto"
          >
            <v-card height="250" width="250" dark>
              <v-img
                :src="post.imageUrl"
                class="align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                cover
                style="position: relative"
              >
                <p
                  style="
                    position: absolute;
                    bottom: 0;
                    right: 1rem;
                    text-align: right;
                    vertical-align: bottom;
                  "
                >
                  {{ post.title }}
                </p>
              </v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
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
      activePosts: 0,
      userId: this.$route.params.id,
    };
  },
  methods: {
    async getUser() {
      try {
        const user = await UserService.getUser(this.userId);
        this.user.id = user.id;
        this.user.username = user.username;
        if (user.avatarUrl) {
          this.user.avatarUrl = user.avatarUrl;
        }
        if (user.backgroundImageUrl) {
          this.user.backgroundImageUrl = user.backgroundImageUrl;
        }
      } catch (error) {
        this.$notify({
          title:
            "Ha ocurrido un problema al obtener el perfil del artista. Intentalo nuevamente en unos minutos.",
          icon: "fa-solid fa-circle-exclamation",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "warning",
        });
        console.log(error);
      }
    },
    showBackgroundInput() {
      this.$refs.fileBackgroundInput.click();
    },
    showAvatarInput() {
      this.$refs.fileAvatarInput.click();
    },
    async editBackground(event) {
      try {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            this.user.backgroundImageUrl = event.target.result;
          };
          reader.readAsDataURL(file);
          await UserService.updateBackground(file);
          this.$notify({
            title: "El background se ha actualizado correctamente.",
            icon: "fa-solid fa-circle-exclamation",
            horizontalAlign: "center",
            verticalAlign: "top",
            type: "success",
          });
        }
      } catch (error) {
        this.$notify({
          title:
            "Ha ocurrido un problema al editar el background de su perfil. Intentalo nuevamente en unos minutos.",
          icon: "fa-solid fa-circle-exclamation",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "warning",
        });
        console.log(error);
      }
    },
    async editAvatar(event) {
      try {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            this.user.avatarUrl = event.target.result;
          };
          reader.readAsDataURL(file);
          await UserService.updateAvatar(file);
          this.$notify({
            title: "El avatar se ha actualizado correctamente.",
            icon: "fa-solid fa-circle-exclamation",
            horizontalAlign: "center",
            verticalAlign: "top",
            type: "success",
          });
        }
      } catch (error) {
        this.$notify({
          title:
            "Ha ocurrido un problema al editar el avatar de su perfil. Intentalo nuevamente en unos minutos.",
          icon: "fa-solid fa-circle-exclamation",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "warning",
        });
        console.log(error);
      }
    },
    async getAllPostsByUser() {
      try {
        const response = await PostService.getAllPostsByUserId(this.userId);
        if (response) {
          this.activePosts = response.filter((x) => x.isPublished);
        }
      } catch (error) {
        this.$notify({
          title:
            "Ha ocurrido un problema al obtener las publicaciones del artista. Intentalo nuevamente en unos minutos.",
          icon: "fa-solid fa-circle-exclamation",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "warning",
        });
        console.log(error);
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
