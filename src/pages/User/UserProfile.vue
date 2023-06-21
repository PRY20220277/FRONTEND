<template>
  <div class="row">
    <div class="col-xl-4 col-lg-5 col-md-6">
      <user-card> </user-card>
    </div>
    <div class="col-xl-8 col-lg-7 col-md-6">
      <edit-profile-form> </edit-profile-form>
    </div>
  </div>
</template>
<script>
import EditProfileForm from "./EditProfileForm.vue";
import UserCard from "./UserCard.vue";
export default {
  components: {
    EditProfileForm,
    UserCard,
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
