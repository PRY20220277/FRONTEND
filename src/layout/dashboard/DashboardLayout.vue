<template>
  <div v-if="currentUser" class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/home" name="Home" icon="ti-panel" />
        <sidebar-link to="/posts" name="Publicaciones" icon="ti-layout-grid2" />
        <sidebar-link to="/images" name="Imágenes" icon="ti-image" />
        <sidebar-link to="/audios" name="Audios" icon="ti-music-alt" />
        <sidebar-link to="/media" name="Galería" icon="ti-bookmark-alt" />
        <sidebar-link to="/profile" name="Perfil" icon="ti-user" />
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>
      <dashboard-content @click.native="toggleSidebar"> </dashboard-content>

      <!-- <content-footer></content-footer> -->
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu,
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
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
