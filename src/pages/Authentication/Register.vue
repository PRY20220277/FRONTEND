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
          dark
          class="text"
          id="email"
          label="Username"
          type="text"
          v-model="model.username"
          clearable
          required
          :rules="rules"
        ></v-text-field>
        <v-text-field
          dark
          class="text"
          id="email"
          label="Correo"
          type="email"
          v-model="model.email"
          clearable
          required
          :rules="emailRules"
        ></v-text-field>
        <v-text-field
          dark
          class="text"
          label="Contraseña"
          v-model="model.password"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="passwordRules"
          :type="show ? 'text' : 'password'"
          @click:append="show = !show"
          counter
          clearable
          required
        ></v-text-field>
        <v-card-actions>
          <v-btn
            :disabled="!isValid"
            class="mx-auto"
            block
            style="border-radius: 10px"
            color="#444654"
            dark
            @click="handleRegister()"
            >Registrar</v-btn
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
            color="#fff"
            >¿Ya tienes cuenta?</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import UserService from "@/services/user.service";
export default {
  name: "register",
  data() {
    return {
      show: false,
      show1: false,
      isValid: true,
      model: {
        username: "",
        email: "",
        password: "",
      },
      rules: [(v) => !!v || "Este campo es requerido"],
      identificationRules: [
        (v) => !!v || "DNI es requerido",
        (v) => !/(?=.*[A-Z])/.test(v) || "No puede contener letras",
        (v) => !/(?=.*[a-z])/.test(v) || "No puede contener letras",
        (v) =>
          !/([!@#$*/?¡¿%])/.test(v) ||
          "No puede contener caracteres especiales [!@#$%]",
        (v) => (v && v.length === 8) || "Debe tener 8 números",
      ],
      phoneNumberRules: [
        (v) => !!v || "Teléfono es requerido",
        (v) => !/(?=.*[A-Z])/.test(v) || "No puede contener letras",
        (v) => !/(?=.*[a-z])/.test(v) || "No puede contener letras",
        (v) =>
          !/([!@#$*/?¡¿%])/.test(v) ||
          "No puede contener caracteres especiales [!@#$%]",
        (v) => (v && v.length === 9) || "Debe tener 9 números",
      ],
      emailRules: [
        (v) => !!v || "Email es requerido",
        (v) =>
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || "E-mail inválido.",
      ],
      passwordRules: [
        (v) => !!v || "Contraseña es requerido",
        (v) =>
          /(?=.*[A-Z])/.test(v) || "La contraseña debe contener una mayúscula",
        (v) =>
          /(?=.*[a-z])/.test(v) || "La contraseña debe contener una minúscula",
        (v) =>
          /([!@#$*/?¡¿%])/.test(v) ||
          "La contraseña debe contener caracteres especiales [!@#$%]",
        (v) =>
          /([1-9])/.test(v) || "La contraseña debe contener al menos un número",
        (v) => (v && v.length >= 8) || "Debe contener como mínimo 8 caracteres",
      ],
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
    async handleRegister() {
      try {
        await UserService.createUser(this.model);
        this.$notify({
          title: "Se ha registrado exitosamente.",
          icon: "fa-solid fa-circle-exclamation",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "success",
        });
        this.$router.push("/login");
      } catch (error) {
        this.$notify({
          title:
            "Ha ocurrido un error al registrarse. Intentelo nuevamente en unos minutos.",
          icon: "fa-solid fa-circle-exclamation",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "warning",
        });
        console.log(error);
      }
    },
    getErrorMessage(e) {
      switch (e) {
        case (e = "This email is already being used by another account"):
          return "El email ingresado ya se encuentra registrado.";
        case (e =
          "This identification is already being used by another account"):
          return "El DNI ingresado ya se encuentra registrado.";
        case (e = "This phoneNumber is already being used by another account"):
          return "El teléfono ingresado ya se encuentra registrado.";
        default:
          return e;
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
