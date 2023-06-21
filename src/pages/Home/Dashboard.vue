<template>
  <v-card dark style="padding: 1rem">
    <v-container>
      <div class="row" style="padding: 2rem">
        <div class="col-md-4">
          <v-text-field
            type="text"
            label="Busca por artista"
            v-model="search.user"
          >
          </v-text-field>
        </div>
        <div class="col-md-4">
          <v-text-field
            type="text"
            label="Busca por categoría"
            v-model="search.category"
          >
          </v-text-field>
        </div>
        <div class="col-md-2">
          <v-btn
            @click="cleanFilters()"
            block
            style="margin-top: 0.75rem; background-color: #444654"
          >
            Limpiar
          </v-btn>
        </div>
        <div class="col-md-2">
          <v-btn
            @click="searchPost()"
            block
            style="
              margin-top: 0.75rem;

              background-color: #444654;
            "
          >
            Buscar
          </v-btn>
        </div>
      </div>
      <v-row justify="center">
        <v-col
          v-for="(post, index) in posts"
          :key="index"
          cols="auto"
          style="margin: auto"
        >
          <v-card dark>
            <v-img
              @click="goToUserProfile(post.userId)"
              height="250"
              width="250"
              :src="post.imageUrl"
              class="align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              cover
              style="position: relative; cursor: pointer"
            >
              <p
                style="
                  position: absolute;
                  bottom: 0;
                  right: 1rem;
                  text-align: right;
                  vertical-align: bottom;
                  font-size: 14px;
                "
              >
                Creado por:
                <b>{{ post.username }}</b>
              </p>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
import { StatsCard, ChartCard } from "@/components/index";
import PostService from "@/services/post.service";
export default {
  components: {
    StatsCard,
    ChartCard,
  },
  data() {
    return {
      statsCards: [
        {
          type: "warning",
          icon: "ti-server",
          title: "Capacity",
          value: "105GB",
          footerText: "Updated now",
          footerIcon: "ti-reload",
        },
        {
          type: "success",
          icon: "ti-wallet",
          title: "Revenue",
          value: "$1,345",
          footerText: "Last day",
          footerIcon: "ti-calendar",
        },
        {
          type: "danger",
          icon: "ti-pulse",
          title: "Errors",
          value: "23",
          footerText: "In the last hour",
          footerIcon: "ti-timer",
        },
        {
          type: "info",
          icon: "ti-twitter-alt",
          title: "Followers",
          value: "+45",
          footerText: "Updated now",
          footerIcon: "ti-reload",
        },
      ],
      posts: [],
      search: {
        user: null,
        category: null,
      },
    };
  },
  methods: {
    async getAllPosts() {
      try {
        const posts = await PostService.getAllPosts();
        this.posts = posts.filter((x) => x.isPublished);
      } catch (error) {
        this.$notify({
          title:
            "Ha ocurrido un problema al obtener las publicaciones. Intentalo nuevamente en unos minutos.",
          icon: "fa-solid fa-circle-exclamation",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "warning",
        });
        console.log(error);
      }
    },
    async searchPost() {
      try {
        const posts = await PostService.searchPost(this.search);
        this.posts = posts;
      } catch (error) {
        this.$notify({
          title:
            "Ha ocurrido un problema al obtener las publicaciones. Intentalo nuevamente en unos minutos.",
          icon: "fa-solid fa-circle-exclamation",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "warning",
        });
        console.log(error);
      }
    },
    async cleanFilters() {
      this.search.user = null;
      this.search.category = null;
      await this.getAllPosts();
    },
    goToUserProfile(id) {
      this.$router.push(`/profile/${id}`);
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
    this.getAllPosts();
  },
};
</script>
<style></style>
