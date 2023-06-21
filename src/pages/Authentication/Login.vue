<template>
  <div style="background-color: #324755; height: 100vh; overflow: hidden">
    <v-card
      class="mx-auto top"
      max-width="500"
      style="border-radius: 10px; background-color: #324755"
      flat
    >
      <div class="pt-1 pb-4">
        <img
          src="@/assets/img/deepartlogo.png"
          height="200px"
          style="
            margin-left: auto;
            margin-right: auto;
            display: block;
            padding-top: 1rem;
          "
        />
      </div>
      <v-form v-model="isValid">
        <v-text-field
          class="text"
          id="email"
          label="Username"
          type="text"
          clearable
          required
          :rules="emailRules"
          v-model="user.username"
          outlined
          dark
        ></v-text-field>
        <v-text-field
          class="text"
          id="password"
          label="Contraseña"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          @click:append="show = !show"
          v-model="user.password"
          clearable
          required
          :rules="rules"
          outlined
          dark
          @keyup.enter="handleLogin"
        ></v-text-field>
        <v-card-actions style="display: flex">
          <v-row align="center" style="flex: 1">
            <v-checkbox dark dense label=""></v-checkbox>
            <p style="padding: 0.5rem 0.25rem; color: #fff">
              Recordar contraseña
            </p>
          </v-row>
          <!-- <v-row align="center" style="flex: 0; margin-top: -1.5rem">
            <v-btn
              id="register"
              to="/register"
              style="border-radius: 10px; color: #fff"
              class="mx-auto"
              dark
              text
              color="#000"
              type="submit"
            >
              <p style="margin-top: 1rem">¿Olvidaste tu contraseña?</p>
            </v-btn>
          </v-row> -->
        </v-card-actions>
        <v-card-actions>
          <v-btn
            :disabled="!isValid"
            class="mx-auto"
            block
            style="border-radius: 10px"
            color="#444654"
            dark
            @click="handleLogin"
            >Iniciar Sesión</v-btn
          >
        </v-card-actions>
        <v-card-actions>
          <v-btn
            id="register"
            to="/register"
            style="border-radius: 10px"
            class="mx-auto"
            dark
            text
            color="#fff"
            >¿Aún no tienes cuenta?</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      user: Object,
      show: false,
      loading: false,
      isValid: true,
      emailRules: [(v) => !!v || "Username es requerido"],
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
    handleLogin() {
      this.loading = true;
      if (!this.isValid) {
        this.loading = false;
        return;
      }

      if (this.user.username && this.user.password) {
        this.$store.dispatch("auth/login", this.user).then(
          (user) => {
            this.$router.push("/");
          },
          (error) => {
            this.loading = false;
            this.$notify({
              title: "Credenciales incorrectas. Intentelo nuevamente.",
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
  padding-top: 4em;
  padding-bottom: 0.3em;
}
.text {
  margin-left: 1.5em;
  margin-right: 1em;
}
.text > label,
input {
  color: rgba(255, 255, 255, 0.7) !important;
}
@media screen and (max-width: 570px) {
  .top {
    margin-top: 0;
  }
}
</style>
