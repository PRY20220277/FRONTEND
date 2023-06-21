<template>
  <v-card dark class="card" style="border-radius: 10px; padding: 4rem">
    <v-tabs centered>
      <v-tab> Publicaciones </v-tab>
      <v-tab> + Nueva Publicación </v-tab>

      <v-tab-item style="background-color: #1e1e1e; padding-top: 1rem">
        <v-card flat dark>
          <v-data-table
            :headers="headerPosts"
            :items="posts"
            :items-per-page="5"
          >
            <template v-slot:[`item.image`]="{ item }">
              <img
                v-if="item.image"
                :src="item.image"
                :alt="item.title"
                height="80"
                style="margin: 0.5rem"
              />
            </template>
            <template v-slot:[`item.isPublished`]="{ item }">
              <v-chip
                small
                :style="item.isPublished ? 'background-color: #28a745' : ''"
                >{{ item.isPublishedText }}</v-chip
              >
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small @click="downloadImage(item.id, item.image)">
                mdi-download
              </v-icon>
              <v-icon
                small
                @click="viewPost(item.id)"
                style="margin-left: 1rem"
              >
                mdi-eye
              </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-tab-item>

      <v-tab-item style="background-color: #1e1e1e; padding-top: 1rem">
        <v-card flat dark>
          <v-form @submit.prevent>
            <div class="row">
              <div class="col-md-12">
                <v-text-field
                  type="text"
                  label="Titulo"
                  placeholder="Titulo"
                  v-model="newPost.title"
                >
                </v-text-field>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <v-text-field
                  type="text"
                  label="Descripción"
                  placeholder="Descripción"
                  v-model="newPost.description"
                >
                </v-text-field>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <v-text-field
                  type="number"
                  :min="0"
                  label="Precio"
                  placeholder="Precio"
                  v-model="newPost.price"
                >
                </v-text-field>
              </div>
              <div class="col-md-6">
                <v-text-field
                  type="number"
                  :min="0"
                  label="Precio Promocional (opcional)"
                  placeholder="Precio Promocional (opcional)"
                  v-model="newPost.specialPrice"
                >
                </v-text-field>
              </div>
            </div>
            <div class="text-center mt-4">
              <v-btn
                @click="createNewPost()"
                block
                style="margin: 1rem; background-color: #444654"
              >
                Crear nueva Publicación
              </v-btn>
            </div>
          </v-form>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>
<script>
import PostService from "../../services/post.service";
import MediaLibraryService from "../../services/media-library.service";
import toastr from "toastr";
import "toastr/toastr.scss";

export default {
  data() {
    return {
      tab: "post",
      posts: [],
      images: [],
      newPost: {
        title: null,
        description: null,
        price: null,
        specialPrice: null,
        isPublished: null,
        userId: null,
        username: null,
        imageId: null,
        imageUrl: null,
      },
      headerPosts: [
        { text: "Imagen", value: "image" },
        { text: "Titulo", value: "title" },
        { text: "Descripción", value: "description" },
        { text: "Publicado", value: "isPublished" },
        { text: "Acciones", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    async getAllPostsByUser() {
      const posts = [];
      const response = await PostService.getAllPostsByUserId(
        this.currentUser.id
      );
      for (const post of response) {
        posts.push({
          id: post.id,
          image: post.imageUrl,
          title: post.title,
          description: post.description,
          isPublished: post.isPublished,
          isPublishedText: post.isPublished ? "Publicado" : "No publicado",
        });
      }
      this.posts = posts;
    },
    async getAllImagesByUser() {
      if (this.currentUser) {
        const images = [];
        const response = await MediaLibraryService.getMediaLibraryByUser(
          this.currentUser.id
        );
        for (const image of response) {
          images.push({
            id: image.id,
            url: image.url,
          });
        }
        this.images = images;
      }
    },
    async createNewPost() {
      if (this.currentUser) {
        this.newPost.userId = this.currentUser.id;
        this.newPost.username = this.currentUser.username;

        const newPost = await PostService.create(this.newPost);
        if (newPost) {
          this.$notify({
            title: "La publicación se ha creado exitosamente.",
            icon: "fa-solid fa-circle-exclamation",
            horizontalAlign: "center",
            verticalAlign: "top",
            type: "success",
          });
          location.reload();
        }
      }
    },
    async viewPost(id) {
      this.$router.push(`/posts/${id}`);
    },
    async downloadImage(id, image) {
      if (!image) {
        this.$notify({
          title: "La publicación no tiene asignada una imagen para descargar.",
          icon: "fa-solid fa-circle-exclamation",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "warning",
        });
        return;
      }

      this.$router.push(`/posts/${id}/download/image`);
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
    this.getAllPostsByUser();
    this.getAllImagesByUser();
  },
};
</script>
<style></style>
