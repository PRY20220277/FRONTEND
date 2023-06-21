<template>
  <v-card dark class="card" style="border-radius: 10px; padding: 4rem">
    <div class="row">
      <div class="col-md-6">
        <img
          :src="imageUrl"
          max-height="300"
          width="300"
          style="padding: 0.5rem"
        />
      </div>
      <div class="col-md-6">
        <div>
          <p>¿En que formato desea descargarlo?</p>
          <v-row>
            <v-col cols="6" v-for="format in formats" :key="format">
              <v-btn
                @click="selectFormat(format)"
                :style="
                  format == formatSelected ? 'background-color: #28a745' : ''
                "
              >
                {{ format }}
              </v-btn>
            </v-col>
          </v-row>
        </div>
        <div style="margin-top: 2rem">
          <p>¿En que tamaño desea descargarlo?</p>
          <v-row>
            <v-col cols="6" v-for="dimension in dimensions" :key="dimension">
              <v-btn
                @click="selectDimensions(dimension)"
                :style="
                  dimension == dimensionsSelected
                    ? 'background-color: #28a745'
                    : ''
                "
              >
                {{ dimension }}
              </v-btn>
            </v-col>
          </v-row>
        </div>
        <div class="text-center mt-4">
          <v-btn
            @click="download()"
            block
            style="margin: 1rem; background-color: #444654"
          >
            Descargar
          </v-btn>
        </div>
      </div>
    </div>
  </v-card>
</template>
<script>
import PostService from "../../services/post.service";
import MediaLibraryService from "../../services/media-library.service";
export default {
  data() {
    return {
      id: this.$route.params.id,
      imageUrl: null,
      formats: ["png", "jpg", "jpeg", "webp"],
      formatSelected: null,
      dimensions: ["1024x1024", "512x512", "256x256", "128x128"],
      dimensionsSelected: null,
    };
  },
  methods: {
    async getPostById() {
      try {
        const post = await PostService.getPostById(this.id);
        this.imageUrl = post.imageUrl;
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
    async download() {
      if (!this.formatSelected) {
        this.$notify({
          title: "Debe seleccionar un formato para descargar la imagen.",
          icon: "fa-solid fa-circle-exclamation",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "warning",
        });
        return;
      }

      if (!this.dimensionsSelected) {
        this.$notify({
          title: "Debe seleccionar unas dimensiones para descargar la imagen.",
          icon: "fa-solid fa-circle-exclamation",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "warning",
        });
        return;
      }

      const dimensions = parseInt(this.dimensionsSelected.split("x")[0]);

      try {
        this.$notify({
          title: "Espere unos segundos se está convirtiendo su imagen.",
          icon: "fa-solid fa-circle-exclamation",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "success",
        });

        const url = await MediaLibraryService.downloadImage({
          imageUrl: this.imageUrl,
          format: this.formatSelected,
          height: dimensions,
          width: dimensions,
        });
        window.open(url, "_blank");
      } catch (error) {
        this.$notify({
          title:
            "Ha existido un problema convirtiendo la imagen. Intentelo nuevamente en unos minutos.",
          icon: "fa-solid fa-circle-exclamation",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "warning",
        });
        console.log(error);
      }
    },
    selectFormat(option) {
      this.formatSelected = option;
    },
    selectDimensions(option) {
      this.dimensionsSelected = option;
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
