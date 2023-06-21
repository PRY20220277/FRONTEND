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
          >Ingrese su nueva tu contraseña</v-text-title
        >
        <v-text-field
          class="text"
          id="password"
          label="Contraseña"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          @click:append="show = !show"
          v-model="password"
          clearable
          required
          :rules="rules"
          outlined
          dark
          style="margin-top: 3rem"
          @keyup.enter="handleLogin"
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
            >Actualizar</v-btn
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
            >Cancelar</v-btn
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
  name: "reset-password-step2",
  data() {
    return {
      id: this.$route.params.id,
      show: false,
      show1: false,
      isValid: true,
      password: null,
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
        const username = this.decrypt(this.id);
        const user = {
          username: username,
          password: this.password,
        };

        const isSuccess = await UserService.resetPassword(user);
        if (isSuccess) {
          this.$notify({
            title: "Su contraseña se ha actualizado correctamente.",
            icon: "fa-solid fa-circle-exclamation",
            horizontalAlign: "center",
            verticalAlign: "top",
            type: "success",
          });

          this.dispatchUser(user);
        }
      } catch (error) {
        this.$notify({
          title:
            "Ha ocurrido un problema al actualizar su contraseña. Intentelo de nuevo en unos minutos.",
          icon: "fa-solid fa-circle-exclamation",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "warning",
        });
      }
    },
    decrypt(value) {
      const algorithm = "aes-256-cbc";
      const key =
        "a92f9c0d773ef522e123a5ea5e1761d45c69f73d4c00e1fa8ec4b4f33bdc266f";

      const decipher = crypto.createDecipher(algorithm, key);

      let decrypted = decipher.update(value, "hex", "utf8");
      decrypted += decipher.final("utf8");
      return decrypted;
    },
    dispatchUser(data) {
      if (data.username && data.password) {
        this.$store.dispatch("auth/login", data).then(
          (user) => {
            this.$router.push("/");
          },
          (error) => {
            this.loading = false;
            this.$notify({
              title:
                "Ha ocurrido un problema al ingresar sus credenciales. Intentelo de nuevo en unos minutos.",
              icon: "fa-solid fa-circle-exclamation",
              horizontalAlign: "center",
              verticalAlign: "top",
              type: "warning",
            });
          }
        );
      }
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
