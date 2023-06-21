<template>
  <v-card dark flat style="border-radius: 10px; padding: 2rem">
    <v-tabs centered dark>
      <v-tab> Imágenes guardadas </v-tab>
      <v-tab> Audios guardados </v-tab>

      <v-tab-item style="background-color: #1e1e1e; padding-top: 1rem">
        <v-card flat dark>
          <div class="row">
            <div class="col-md-12">
              <v-row class="mt-3" v-if="images">
                <v-col cols="3" v-for="image in images" :key="image.id">
                  <enlargeable-image :src="image.url" :src_large="image.url" />
                  <div style="margin: 1rem; text-align: center"></div>
                </v-col>
              </v-row>
            </div>
          </div>
        </v-card>
      </v-tab-item>

      <v-tab-item style="background-color: #1e1e1e; padding-top: 1rem">
        <v-card flat dark>
          <div class="row">
            <div class="col-md-12">
              <v-data-table
                :headers="headerAudios"
                :items="audios"
                :items-per-page="5"
              >
                <template v-slot:[`item.url`]="{ item }">
                  <v-icon
                    small
                    @click="downloadAudio(item.url)"
                    style="padding-left: 1rem"
                  >
                    mdi-download
                  </v-icon>
                </template>
                <template v-slot:[`item.action`]="{ item }">
                  <v-icon
                    small
                    @click="playAudio(item.id)"
                    style="padding-left: 1rem"
                  >
                    mdi-play
                  </v-icon>
                  <audio :id="item.id" :src="item.url" :loop="true"></audio>
                </template>
              </v-data-table>
            </div>
          </div>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>
<script>
import MediaLibraryService from "../../services/media-library.service";
import EnlargeableImage from "@diracleo/vue-enlargeable-image";
export default {
  components: {
    EnlargeableImage,
  },
  data() {
    return {
      images: [],
      audios: [],
      headerAudios: [
        // { text: "Id", value: "id" },
        { text: "Nombre", value: "name" },
        { text: "Descargar", value: "url", sortable: false },
        { text: "Reproducir", value: "action", sortable: false },
      ],
    };
  },
  methods: {
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
    downloadAudio(url) {
      window.open(url, "_blank");
    },
    playAudio(id) {
      const audioElement = document.getElementById(id);
      audioElement.play();
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
    this.getAllImagesByUser();
    this.getAllAudiosByUser();
  },
};
</script>
<style></style>
