<template>
  <div style="background-color: #324755; height: 100vh; overflow: hidden">
    <v-card
      class="mx-auto top"
      max-width="500"
      style="border-radius: 10px; background-color: #324755; margin-top: 3.5rem"
      flat
    >
      <div class="pt-1 pb-4">
        <img
          height="100"
          src="@/assets/img/deepartlogo.png"
          style="margin-left: auto; margin-right: auto; display: block"
        />
      </div>
      <v-form v-model="isValid" style="text-align: center; padding: 1rem">
        <v-text-title style="font-size: 1.5rem; color: #fff"
          >Ingresa tu Username</v-text-title
        >
        <v-text-field
          class="text"
          label="Username"
          type="text"
          clearable
          required
          dark
          outlined
          v-model="username"
          :rules="rules"
          style="margin-top: 3rem"
        ></v-text-field>
        <v-card-actions>
          <v-btn
            :disabled="!isValid"
            class="mx-auto"
            block
            style="border-radius: 10px"
            color="#393e4e"
            dark
            @click="handleResetPassword()"
            >Verificar Username</v-btn
          >
        </v-card-actions>
        <v-card-actions>
          <v-btn
            id="login"
            to="/login"
            block
            style="border-radius: 10px"
            class="mx-auto"
            dark
            text
            color="#000"
            >¿Ya tienes cuenta?</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import UserService from "@/services/user.service";
import crypto from "crypto";

export default {
  name: "reset-password-step1",
  data() {
    return {
      show: false,
      show1: false,
      isValid: true,
      username: null,
      rules: [(v) => !!v || "Este campo es requerido"],
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    async handleResetPassword() {
      try {
        const user = await UserService.searchUser(this.username);
        if (user) {
          const usernameEncrypted = this.encrypt(this.username);
          this.$notify({
            title: "Ingrese su nueva contraseña.",
            icon: "fa-solid fa-circle-exclamation",
            horizontalAlign: "center",
            verticalAlign: "top",
            type: "success",
          });
          this.$router.push(`/reset-password/${usernameEncrypted}`);
        }
      } catch (error) {
        this.$notify({
          title: "El username ingresado no se encuentra registrado.",
          icon: "fa-solid fa-circle-exclamation",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "warning",
        });
      }
    },
    encrypt(username) {
      const algorithm = "aes-256-cbc";
      const key =
        "a92f9c0d773ef522e123a5ea5e1761d45c69f73d4c00e1fa8ec4b4f33bdc266f";

      const cipher = crypto.createCipher(algorithm, key);

      let encrypted = cipher.update(username, "utf8", "hex");
      encrypted += cipher.final("hex");
      return encrypted;
    },
  },
};
</script>

<style scoped>
.top {
  padding-bottom: 1em;
}
.text {
  margin-left: 1.5em;
  margin-right: 1em;
}
.text2 {
  margin-left: 0.7em;
  margin-right: 0.3em;
}

@media screen and (max-width: 570px) {
  .top {
    margin-top: 0;
  }
}
</style>
