<template>
  <div>
    <v-card dark style="border-radius: 10px">
      <div>
        <v-btn
          @click="goBack"
          style="background-color: #444654; margin: 2rem 0 0 2rem"
          >Regresar</v-btn
        >
      </div>
      <div class="row" style="margin: auto; padding: 2rem; text-align: center">
        <div class="col-md-12">
          <h3>Selecciona una o más categorías</h3>
          <v-row class="mt-3">
            <v-col
              cols="4"
              v-for="(category, index) in categories"
              :key="index"
            >
              <div>
                <div class="d-inline">
                  <v-checkbox
                    v-model="selectedCategories"
                    :value="category.name"
                  ></v-checkbox>
                </div>
                <div class="d-inline">
                  <p style="margin-top: -2.75rem">{{ category.name }}</p>
                </div>
              </div>
              <enlargeable-image
                :src="category.imageUrl"
                :src_large="category.imageUrl"
              />
            </v-col>
          </v-row>
        </div>
        <div class="col-md-12 text-center mt-4">
          <v-btn
            @click="saveCategories()"
            block
            style="margin: 2rem 0 0; background-color: #444654"
          >
            Guardar Categorías
          </v-btn>
        </div>
      </div>
    </v-card>
  </div>
</template>
<script>
import PostService from "../../services/post.service";
import EnlargeableImage from "@diracleo/vue-enlargeable-image";
export default {
  components: {
    EnlargeableImage,
  },
  data() {
    return {
      id: this.$route.params.id,
      post: {
        id: null,
        userId: null,
        username: "",
        title: "",
        description: "",
        imageUrl: "",
        price: 0,
        specialPrice: 0,
        isPublished: false,
        category: [],
      },
      selectedCategories: [],
      categories: [
        {
          name: "RetroFuturista y Aliens",
          imageUrl:
            "https://deepartstorage.blob.core.windows.net/files/retrofuturista.avif",
        },
        {
          name: "Retratos y Selfies",
          imageUrl:
            "https://deepartstorage.blob.core.windows.net/files/retratos.webp",
        },
        {
          name: "Paisajes y Naturaleza",
          imageUrl:
            "https://deepartstorage.blob.core.windows.net/files/paisajes.avif",
        },
        {
          name: "Animaciones y Caricaturas",
          imageUrl:
            "https://deepartstorage.blob.core.windows.net/files/animaciones.webp",
        },
        {
          name: "Edificios y Templos",
          imageUrl:
            "https://deepartstorage.blob.core.windows.net/files/edificios.jpg",
        },
        {
          name: "Cosmos y Galaxias",
          imageUrl:
            "https://deepartstorage.blob.core.windows.net/files/galaxias.jpg",
        },
      ],
    };
  },
  methods: {
    async getPostById() {
      try {
        const post = await PostService.getPostById(this.id);
        this.post.id = post.id;
        this.post.userId = post.userId;
        this.post.username = post.username;
        this.post.title = post.title;
        this.post.price = post.price;
        this.post.specialPrice = post.specialPrice;
        this.post.description = post.description;
        this.post.isPublished = post.isPublished;
        this.post.imageUrl = post.imageUrl;
        this.post.category = post.category;
        this.selectedCategories = post.category;
      } catch (error) {
        this.$notify({
          title:
            "Ha ocurrido un problema al obtener la información de la publicación. Intentelo nuevamente en unos minutos.",
          icon: "fa-solid fa-circle-exclamation",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "warning",
        });
        console.log(error);
      }
    },
    async saveCategories() {
      if (!this.post.imageUrl && this.post.isPublished) {
        this.$notify({
          title: "Debe seleccionar una imagen para que se pueda publicar.",
          icon: "fa-solid fa-circle-exclamation",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "warning",
        });
        return;
      }

      try {
        this.post.category = this.selectedCategories;
        await PostService.updatePost(this.post.id, this.post);
        this.$notify({
          title: "La publicación se ha actualizado exitosamente.",
          icon: "fa-solid fa-circle-exclamation",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "success",
        });

        await this.sleep(2000);

        this.$router.push("/posts");
      } catch (error) {
        this.$notify({
          title:
            "Ha ocurrido un problema al actualizar las categorías de la publicación. Intentelo nuevamente en unos minutos.",
          icon: "fa-solid fa-circle-exclamation",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "warning",
        });
        console.log(error);
      }
    },
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    goBack() {
      this.$router.go(-1);
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
    this.getPostById();
  },
};
</script>
<style></style>
