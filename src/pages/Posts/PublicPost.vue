<template>
  <div>
    <v-card dark style="border-radius: 10px">
      <div class="row" style="margin: auto; padding: 2rem; text-align: center">
        <div class="col-md-6">
          <enlargeable-image :src="post.imageUrl" :src_large="post.imageUrl" />
        </div>
        <div class="col-md-6">
          <h3 style="margin-bottom: 2rem">{{ post.title }}</h3>
          <h6>Creado por: {{ post.username }}</h6>
          <h5>{{ post.description }}</h5>
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
      },
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
