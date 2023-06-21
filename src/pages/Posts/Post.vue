<template>
  <div>
    <v-card
      v-if="currentUser.id == post.userId"
      dark
      flat
      style="border-radius: 10px; padding: 2rem"
    >
      <v-tabs centered dark>
        <v-tab> Información </v-tab>
        <v-tab> Imagen </v-tab>
        <v-tab> Filtros </v-tab>

        <v-tab-item style="background-color: #1e1e1e; padding-top: 1rem">
          <v-card dark flat style="border-radius: 10px; padding: 2rem">
            <div class="row">
              <div class="col-xl-12 col-lg-12 col-md-12">
                <v-text-title
                  style="font-size: 1.5rem; font-weight: 600 !important, color: #000; margin-left: .5rem"
                  >Detalle de la Publicación
                </v-text-title>
                <div class="row mt-3">
                  <div class="col-md-8">
                    <v-text-field
                      type="text"
                      label="Título"
                      v-model="post.title"
                    >
                    </v-text-field>
                  </div>
                  <div class="col-md-4">
                    <v-row class="mt-3">
                      <v-col>
                        <div style="margin-top: -1rem">
                          <v-btn
                            style="background-color: #444654"
                            @click="goToPostCategory()"
                            >Seleccionar Categoría</v-btn
                          >
                        </div>
                      </v-col>
                    </v-row>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <v-text-field
                      type="text"
                      label="Descripción"
                      v-model="post.description"
                    >
                    </v-text-field>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-4">
                    <v-text-field
                      type="number"
                      :min="0"
                      label="Precio"
                      v-model="post.price"
                    >
                    </v-text-field>
                  </div>
                  <div class="col-md-4">
                    <v-text-field
                      type="number"
                      :min="0"
                      label="Precio Promocional (opcional)"
                      v-model="post.specialPrice"
                    >
                    </v-text-field>
                  </div>
                  <div class="col-md-4" style="display: flex">
                    <div style="margin: 1.25rem 1rem 0 0">
                      <p>¿Desea publicarlo?</p>
                    </div>
                    <div style="margin-top: 0.75rem">
                      <label class="switch">
                        <input
                          type="checkbox"
                          :checked="post.isPublished"
                          v-model="post.isPublished"
                        />
                        <span class="slider round"></span>
                      </label>
                    </div>
                  </div>
                </div>
                <div class="text-center mt-4">
                  <v-btn
                    @click="updatePost()"
                    block
                    style="margin: 2rem 0 0; background-color: #444654"
                  >
                    Actualizar Publicación
                  </v-btn>
                </div>
              </div>
            </div>
          </v-card>
        </v-tab-item>

        <v-tab-item style="background-color: #1e1e1e; padding-top: 1rem">
          <v-card flat dark>
            <div class="row">
              <div class="col-md-6">
                <v-card-title>Imagen Actual</v-card-title>
                <div>
                  <img
                    v-if="post.imageUrl"
                    :src="post.imageUrl"
                    :alt="post.title"
                    max-height="300"
                    width="300"
                    style="padding: 0.5rem"
                  />
                  <div v-else>
                    <v-row>
                      <v-col>
                        <p>No ha seleccionado ninguna imagen</p>
                      </v-col>
                    </v-row>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <v-card-title>Imágenes guardadas</v-card-title>
                <v-row class="mt-3" v-if="images">
                  <v-col
                    cols="4"
                    v-for="image in images"
                    :key="image.id"
                    style="display: block; position: relative"
                  >
                    <v-checkbox
                      v-model="selectedImages"
                      :value="image.url"
                      style="position: absolute; top: -0.75rem; left: -0.75rem"
                    ></v-checkbox>
                    <enlargeable-image
                      :src="image.url"
                      :src_large="image.url"
                    />
                    <div style="margin: 1rem; text-align: center"></div>
                  </v-col>
                </v-row>
                <div>
                  <v-row>
                    <v-col>
                      <h5 class="pt-3">
                        * Seleccione la imagen que desea cambiar
                      </h5>
                      <v-btn
                        @click="saveImage()"
                        block
                        style="margin: 2rem 0 0; background-color: #444654"
                      >
                        Actualizar imagen
                      </v-btn>
                    </v-col>
                  </v-row>
                </div>
              </div>
            </div>
          </v-card>
        </v-tab-item>

        <v-tab-item style="background-color: #1e1e1e; padding-top: 1rem">
          <v-card flat dark>
            <div class="row">
              <div class="col-md-12">
                <v-card-title>Audios guardados</v-card-title>
                <div>
                  <v-data-table
                    :headers="headerAudios"
                    :items="audios"
                    :items-per-page="5"
                  >
                    <template v-slot:[`item.url`]="{ item }">
                      <v-icon
                        small
                        @click="distortImage(item.url)"
                        style="padding-left: 1rem"
                      >
                        mdi-music
                      </v-icon>
                    </template>
                  </v-data-table>
                </div>
              </div>
              <div class="col-md-6">
                <v-card-title>Imagen Actual</v-card-title>
                <div>
                  <img
                    v-if="post.imageUrl"
                    :src="post.imageUrl"
                    :alt="post.title"
                    max-height="300"
                    width="300"
                    style="padding: 0.5rem"
                  />
                  <div v-else>
                    <v-row>
                      <v-col>
                        <p>No ha seleccionado ninguna imagen</p>
                      </v-col>
                    </v-row>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <v-card-title v-if="imageDistortionUrl"
                  >Imagen Distorsionada (Distorsión #
                  {{ post.iteration }})</v-card-title
                >
                <div>
                  <img
                    v-if="imageDistortionUrl"
                    :src="imageDistortionUrl"
                    :alt="post.title"
                    max-height="300"
                    width="300"
                    style="padding: 0.5rem"
                  />
                  <div v-else style="margin-top: 5rem">
                    <v-row>
                      <v-col>
                        <p v-if="distorNumber == 1">
                          No se ha seleccionado ningun sonido para distorsionar.
                        </p>
                      </v-col>
                    </v-row>
                  </div>
                </div>
              </div>
              <v-btn
                @click="saveDistortImage()"
                block
                style="margin: 1rem; background-color: #444654"
              >
                Guardar imagen distorsionada
              </v-btn>
            </div>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </div>
</template>
<script>
import PostService from "../../services/post.service";
import MediaLibraryService from "../../services/media-library.service";
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
        title: "",
        description: "",
        category: "",
        imageUrl: "",
        price: 0,
        specialPrice: 0,
        isPublished: false,
        iteration: 0,
      },
      distorNumber: 1,
      images: [],
      selectedImages: [],
      audios: [],
      headerAudios: [
        { text: "Nombre", value: "name" },
        { text: "Utilizar", value: "url", sortable: false },
      ],
      imageDistortionUrl: null,
    };
  },
  methods: {
    async getPostById() {
      try {
        const post = await PostService.getPostById(this.id);
        this.post.id = post.id;
        this.post.userId = post.userId;
        this.post.title = post.title;
        this.post.price = post.price;
        this.post.specialPrice = post.specialPrice;
        this.post.description = post.description;
        this.post.isPublished = post.isPublished;
        this.post.imageUrl = post.imageUrl;
        this.post.category = post.category;
        this.post.iteration = post.iteration ? post.iteration : 1;
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
    async getAllImagesByUser() {
      const images = [];
      const response = await MediaLibraryService.getMediaLibraryByUser(
        this.currentUser.id
      );
      for (const image of response) {
        if (image.type != "mp3") {
          images.push({
            id: image.id,
            url: image.url,
          });
        }
      }
      this.images = images;
    },
    async getAllAudiosByUser() {
      const audios = [];
      const response = await MediaLibraryService.getMediaLibraryByUser(
        this.currentUser.id
      );
      for (const audio of response) {
        if (audio.type == "mp3") {
          audios.push({
            id: audio.id,
            name: audio.name,
            url: audio.url,
          });
        }
      }
      this.audios = audios;
    },
    async saveImage() {
      if (this.selectedImages.length > 1) {
        this.$notify({
          title: "Solo debe seleccionar una imagen.",
          icon: "fa-solid fa-circle-exclamation",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "warning",
        });
        return;
      }

      this.post.imageUrl = this.selectedImages[0];
      try {
        await PostService.updatePost(this.id, this.post);
        this.$notify({
          title: "La imagen se ha actualizado correctamente.",
          icon: "fa-solid fa-circle-exclamation",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "success",
        });
      } catch (error) {
        this.$notify({
          title:
            "Ha ocurrido un problema al actualizar la imagen de la publicación. Intentelo nuevamente en unos minutos.",
          icon: "fa-solid fa-circle-exclamation",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "warning",
        });
        console.log(error);
      }
    },
    async updatePost() {
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

      if (this.post.specialPrice && this.post.price < this.post.specialPrice) {
        this.$notify({
          title:
            "El precio promocional no puede ser mayor al precio base de la publicación.",
          icon: "fa-solid fa-circle-exclamation",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "warning",
        });
        return;
      }

      try {
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
            "Ha ocurrido un problema al actualizar la información de la publicación. Intentelo nuevamente en unos minutos.",
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
    async distortImage(audioUrl) {
      gtag("event", "button_click", {
        event_category: "Button",
        event_label: "Button Clicked",
        value: 1,
      });

      if (!this.post.imageUrl) {
        this.$notify({
          title: "Debe seleccionar una imagen para aplicar una distorsión.",
          icon: "fa-solid fa-circle-exclamation",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "warning",
        });
        return;
      }

      // this.imageDistortionUrl = this.getImageDistortion(this.post.imageUrl);

      try {
        this.$notify({
          title: "Se está distorsionando la imagen. Espere unos segundos.",
          icon: "fa-solid fa-circle-exclamation",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "success",
        });

        const model = {
          imageUrl: this.post.imageUrl,
          audioUrl: audioUrl,
          distortOption: "DUPLICATE_V1",
        };

        this.imageDistortionUrl = await MediaLibraryService.distortImage(model);
      } catch (error) {
        this.$notify({
          title:
            "Ha ocurrido un problema al distorsionar la imagen. Intentelo nuevamente en unos minutos.",
          icon: "fa-solid fa-circle-exclamation",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "warning",
        });
        console.log(error);
      }
    },
    getImageDistortion(url) {
      let image = url;

      const img1 = [
        "https://deepartstorage.blob.core.windows.net/files/253a135e-5ed9-f413-5fd6-036fc6c45902_1.jpg",
        "https://deepartstorage.blob.core.windows.net/files/253a135e-5ed9-f413-5fd6-036fc6c45902_2.jpg",
        "https://deepartstorage.blob.core.windows.net/files/253a135e-5ed9-f413-5fd6-036fc6c45902_3.jpg",
        "https://deepartstorage.blob.core.windows.net/files/253a135e-5ed9-f413-5fd6-036fc6c45902_4.jpg",
        "https://deepartstorage.blob.core.windows.net/files/253a135e-5ed9-f413-5fd6-036fc6c45902_5.jpg",
      ];

      const img2 = [
        "https://deepartstorage.blob.core.windows.net/files/d4453ab9-7520-3c6e-4098-605834ab0c7e_1.jpg",
        "https://deepartstorage.blob.core.windows.net/files/d4453ab9-7520-3c6e-4098-605834ab0c7e_2.jpg",
        "https://deepartstorage.blob.core.windows.net/files/d4453ab9-7520-3c6e-4098-605834ab0c7e_3.jpg",
        "https://deepartstorage.blob.core.windows.net/files/d4453ab9-7520-3c6e-4098-605834ab0c7e_4.jpg",
        "https://deepartstorage.blob.core.windows.net/files/d4453ab9-7520-3c6e-4098-605834ab0c7e_5.jpg",
      ];

      const img1_1 = [
        "https://deepartstorage.blob.core.windows.net/files/253a135e-5ed9-f413-5fd6-036fc6c45902_3_1.png",
        "https://deepartstorage.blob.core.windows.net/files/253a135e-5ed9-f413-5fd6-036fc6c45902_3_2.png",
        "https://deepartstorage.blob.core.windows.net/files/253a135e-5ed9-f413-5fd6-036fc6c45902_3_3.jpg",
        "https://deepartstorage.blob.core.windows.net/files/253a135e-5ed9-f413-5fd6-036fc6c45902_3_4.jpg",
      ];

      const img1_1_1 = [
        "https://deepartstorage.blob.core.windows.net/files/253a135e-5ed9-f413-5fd6-036fc6c45902_3_1_1.jpg",
        "https://deepartstorage.blob.core.windows.net/files/253a135e-5ed9-f413-5fd6-036fc6c45902_3_1_2.jpg",
        "https://deepartstorage.blob.core.windows.net/files/253a135e-5ed9-f413-5fd6-036fc6c45902_3_1_3.jpg",
        "https://deepartstorage.blob.core.windows.net/files/253a135e-5ed9-f413-5fd6-036fc6c45902_3_1_4.jpg",
      ];

      const min = 1;
      const max = 4;
      const randomInt = Math.floor(Math.random() * (max - min + 1) + min);

      if (img1_1.includes(url)) {
        this.distorNumber = 3;
        const img = url.startsWith(
          "https://deepartstorage.blob.core.windows.net/files/253a135e-5ed9-f413-5fd6-036fc6c45902"
        )
          ? 1
          : 2;

        switch (img) {
          case 1:
            image = img1_1_1[randomInt];
            break;
          case 2:
            image = img1_1_1[randomInt];
            break;
        }

        return image;
      } else if (img1.includes(url)) {
        this.distorNumber = 2;
        const img = url.startsWith(
          "https://deepartstorage.blob.core.windows.net/files/253a135e-5ed9-f413-5fd6-036fc6c45902"
        )
          ? 1
          : 2;

        switch (img) {
          case 1:
            image = img1_1[randomInt];
            break;
          case 2:
            image = img1_1[randomInt];
            break;
        }

        return image;
      } else {
        const img =
          url ==
          "https://deepartstorage.blob.core.windows.net/files/253a135e-5ed9-f413-5fd6-036fc6c45902.png"
            ? 1
            : 2;

        switch (img) {
          case 1:
            image = img1[randomInt];
            break;
          case 2:
            image = img2[randomInt];
            break;
        }
      }

      if (
        url ==
        "https://deepartstorage.blob.core.windows.net/files/9d41d44d-e508-33fd-93c8-dd659c00e8ff.webp"
      ) {
      }

      return image;
    },
    async saveDistortImage() {
      if (!this.imageDistortionUrl) {
        this.$notify({
          title: "No se ha generado ninguna distorsión.",
          icon: "fa-solid fa-circle-exclamation",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "warning",
        });
        return;
      }
      try {
        this.post.imageUrl = this.imageDistortionUrl;
        this.post.iteration = this.post.iteration + 1;
        await PostService.updatePost(this.id, this.post);
        this.$notify({
          title: "La imagen se ha actualizado correctamente.",
          icon: "fa-solid fa-circle-exclamation",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "success",
        });

        this.$router.push("/posts");
      } catch (error) {
        this.$notify({
          title:
            "Ha ocurrido un problema al actualizar la imagen de la publicación. Intentelo nuevamente en unos minutos.",
          icon: "fa-solid fa-circle-exclamation",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "warning",
        });
        console.log(error);
      }
    },
    goToPostCategory() {
      this.$router.push(`/posts/${this.post.id}/category`);
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
    this.getAllImagesByUser();
    this.getAllAudiosByUser();
  },
};
</script>
<style>
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  display: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px; /* rounded switch */
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 50%; /* rounded handle */
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}
</style>
