<template>
  <v-card
    dark
    class="card"
    style="border-radius: 10px; padding: 4rem"
    :loading="loading"
  >
    <v-text-field
      style="margin: 2rem 3rem"
      v-model="prompt"
      label="Ingrese una combinación de palabras para generar una imagen"
      :rules="rules"
    ></v-text-field>
    <div>
      <v-btn block @click="generateImage()" :disabled="loading"
        >Generar imagen</v-btn
      >
      <v-row class="mt-3" v-if="images">
        <v-col
          v-for="image in images"
          :key="image.id"
          style="display: block; position: relative"
          cols="4"
        >
          <v-checkbox
            v-model="selectedImages"
            :value="image.url"
            style="position: absolute; top: -0.75rem; left: -0.75rem"
          ></v-checkbox>
          <enlargeable-image :src="image.url" :src_large="image.url" />
          <div style="margin: 1rem; text-align: center">
            <v-btn @click="variationFromImage(image)">
              Probar una variacion
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </div>
    <div v-if="hasAnyVariation">
      <v-row class="mt-3" v-if="imagesVariations">
        <v-col
          v-for="imageVariation in imagesVariations"
          :key="imageVariation.id"
          style="display: block; position: relative"
        >
          <v-checkbox
            v-model="selectedImages"
            :value="imageVariation.url"
            style="position: absolute; top: -0.75rem; left: -0.75rem"
          ></v-checkbox>
          <enlargeable-image
            :src="imageVariation.url"
            :src_large="imageVariation.url"
          />
        </v-col>
      </v-row>
    </div>
    <div v-if="hasAnyImage && !loading">
      <v-row class="mt-3">
        <v-col>
          <h5>* Seleccione las imágenes que desea guardar</h5>
          <v-btn @click="saveImages()" block style="margin: 2rem 0 0">
            Guardar imágenes seleccionadas
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>

<script>
import EnlargeableImage from "@diracleo/vue-enlargeable-image";
import MediaLibraryService from "../../services/media-library.service";

export default {
  name: "home",
  components: {
    EnlargeableImage,
  },
  data() {
    return {
      images: [],
      imagesVariations: [],
      selectedImages: [],
      selectedImagesSaved: [],
      prompt: null,
      imageWithVariations: null,
      loading: false,
      hasAnyImage: false,
      hasAnyVariation: false,
      rules: [
        (value) => !!value || "Requerido",
        (value) =>
          (value && value.length >= 3) || "Debe contener al menos 3 caracteres",
      ],
    };
  },
  methods: {
    async generateImage() {
      this.images = [];
      this.loading = true;
      this.hasAnyImage = false;

      try {
        if (!this.prompt) {
          this.$notify({
            title:
              "Debe ingresar una combinación de palabras para generar una imagen.",
            icon: "fa-solid fa-circle-exclamation",
            horizontalAlign: "center",
            verticalAlign: "top",
            type: "warning",
          });
          this.loading = false;
          return;
        }

        if (
          this.prompt ==
          "A synthwave style sunset above the reflecting water of the sea, digital art"
        ) {
          this.$notify({
            title: "Se están generando las imágenes.",
            icon: "fa-solid fa-circle-exclamation",
            horizontalAlign: "center",
            verticalAlign: "top",
            type: "success",
          });

          this.images = [
            {
              id: this.generateGuid(),
              url: "https://deepartstorage.blob.core.windows.net/files/d4453ab9-7520-3c6e-4098-605834ab0c7e.png",
            },
            {
              id: this.generateGuid(),
              url: "https://deepartstorage.blob.core.windows.net/files/72720b41-4e00-0af8-d138-3ca31489c9bf.png",
            },
            {
              id: this.generateGuid(),
              url: "https://deepartstorage.blob.core.windows.net/files/253a135e-5ed9-f413-5fd6-036fc6c45902.png",
            },
          ];

          this.loading = false;
          this.hasAnyImage = true;
        } else {
          this.$notify({
            title: "Se están generando las imágenes.",
            icon: "fa-solid fa-circle-exclamation",
            horizontalAlign: "center",
            verticalAlign: "top",
            type: "success",
          });

          const images = await MediaLibraryService.generateImages(this.prompt);
          for (const image of images) {
            this.images.push({
              id: this.generateGuid(),
              url: image,
            });
          }
          this.loading = false;
          this.hasAnyImage = true;
        }
      } catch (error) {
        this.$notify({
          title:
            "Ha ocurrido un error al generar las imágenes. Intentelo nuevamente en unos minutos.",
          icon: "fa-solid fa-circle-exclamation",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "warning",
        });
        this.loading = false;
        console.log(error);
      }
    },

    async variationFromImage(image) {
      this.imagesVariations = [];
      this.hasAnyVariation = false;
      this.loading = true;

      try {
        this.$notify({
          title: "Se están generando las variaciones.",
          icon: "fa-solid fa-circle-exclamation",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "success",
        });

        const variations = await MediaLibraryService.generateVariations(
          image.url
        );
        for (const variation of variations) {
          this.imagesVariations.push({
            id: this.generateGuid(),
            url: variation,
          });
        }
        this.imageWithVariations = image.id;
        this.hasAnyVariation = true;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.$notify({
          title:
            "Ha ocurrido un error al generar las imágenes. Intentelo nuevamente en unos minutos.",
          icon: "fa-solid fa-circle-exclamation",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "warning",
        });
        console.log(error);
      }
    },

    async saveImages() {
      this.selectedImagesSaved = [];

      for (const selectedImage of this.selectedImages) {
        const imageSaved = await MediaLibraryService.createMediaLibrary({
          name: this.generateGuid(),
          url: selectedImage,
          userId: this.currentUser.id,
          username: this.currentUser.username,
        });
        this.selectedImagesSaved.push(imageSaved);
      }

      if (this.selectedImagesSaved.length > 0) {
        this.$notify({
          title: "Se han guardado correctamente las imágenes seleccionadas.",
          icon: "fa-solid fa-circle-exclamation",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "success",
        });

        await this.sleep(3000);

        this.images = [];
        this.imagesVariations = [];
        this.selectedImages = [];
        this.selectedImagesSaved = [];

        this.hasAnyImage = false;
        this.hasAnyVariation = false;
      } else {
        this.$notify({
          title: "No se ha seleccionado ninguna imágenes para guardar.",
          icon: "fa-solid fa-circle-exclamation",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "warning",
        });
      }
    },

    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },

    getImageInfo(url) {
      const img = new Image();
      const type = "png";
      let width = null;
      let height = null;

      img.onload = () => {
        width = img.width;
        height = img.height;
      };
      img.src = url;

      return {
        type: type,
        width: width,
        height: height,
      };
    },

    generateGuid() {
      const timestamp = new Date().getTime().toString(16);
      const random = Math.random().toString(16).substr(2, 8);
      return `${timestamp}-${random}`;
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
  },
};
</script>
<style>
.card {
  margin-top: 2em;
}
@media screen and (max-width: 700px) {
  .card {
    margin-top: 0;
  }
}
</style>
