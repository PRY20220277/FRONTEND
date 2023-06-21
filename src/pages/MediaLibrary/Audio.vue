<template>
  <v-card
    dark
    class="card"
    style="border-radius: 10px; padding: 4rem; text-align: center"
  >
    <!-- <v-text-field
      style="margin: 2rem 3rem"
      v-model="youtubeUrl"
      label="Ingrese una url de youtube"
    ></v-text-field>

    <p>o</p> -->

    <v-file-input
      v-model="audio"
      show-size
      counter
      chips
      multiple
      accept="audio/mpeg"
      label="Suba un audio"
    ></v-file-input>

    <div>
      <v-row class="mt-3">
        <v-col>
          <v-btn
            :disabled="isLoading"
            @click="saveAudio()"
            block
            style="margin: 2rem 0 0"
          >
            Guardar archivo ingresado
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>
<script>
import MediaLibraryService from "../../services/media-library.service";
export default {
  data() {
    return {
      audio: null,
      isLoading: false,
    };
  },
  methods: {
    async saveAudio() {
      try {
        this.isLoading = true;
        if (!this.audio) {
          this.$notify({
            title: "Debe ingresar un audio.",
            icon: "fa-solid fa-circle-exclamation",
            horizontalAlign: "center",
            verticalAlign: "top",
            type: "warning",
          });
          return;
        }
        await MediaLibraryService.uploadFile(this.audio[0]);
        this.$notify({
          title: "El audio se ha registrado exitosamente.",
          icon: "fa-solid fa-circle-exclamation",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "success",
        });
        this.isLoading = false;
        location.reload();
      } catch (error) {
        this.$notify({
          title:
            "Ha ocurrido un problema al registrar el audio. Intentelo nuevamente en unos minutos.",
          icon: "fa-solid fa-circle-exclamation",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "warning",
        });
        this.isLoading = false;
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
  },
};
</script>
<style></style>
