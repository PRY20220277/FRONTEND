import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
import NotFound from "@/pages/Utils/NotFoundPage.vue";
import Login from "@/pages/Authentication/Login.vue";
import Register from "@/pages/Authentication/Register.vue";
import ResetPasswordStep1 from "@/pages/Authentication/ResetPasswordStep1.vue";
import ResetPasswordStep2 from "@/pages/Authentication/ResetPasswordStep2.vue";

import Dashboard from "@/pages/Home/Dashboard.vue";
import UserProfile from "@/pages/User/UserProfile.vue";
import UserPublicProfile from "@/pages/User/UserPublicProfile.vue";
import Images from "@/pages/MediaLibrary/Images.vue";
import MediaLibrary from "@/pages/MediaLibrary/MediaLibrary.vue";
import Maps from "@/pages/Utils/Maps.vue";
import Posts from "@/pages/Posts/Posts.vue";
import Post from "@/pages/Posts/Post.vue";
import PublicPost from "@/pages/Posts/PublicPost.vue";
import PostCategory from "@/pages/Posts/PostCategory.vue";
import DownloadImage from "@/pages/Posts/DownloadImage.vue";
import Audio from "@/pages/MediaLibrary/Audio.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "home",
        component: Dashboard,
      },
      {
        path: "profile",
        name: "profile",
        component: UserProfile,
      },
      {
        path: "profile/:id",
        name: "publicProfile",
        component: UserPublicProfile,
      },
      {
        path: "images",
        name: "images",
        component: Images,
      },
      {
        path: "media",
        name: "media",
        component: MediaLibrary,
      },
      {
        path: "maps",
        name: "maps",
        component: Maps,
      },
      {
        path: "posts",
        name: "posts",
        component: Posts,
      },
      {
        path: "posts/:id",
        name: "post",
        component: Post,
      },
      {
        path: "posts/:id/category",
        name: "postCategory",
        component: PostCategory,
      },
      {
        path: "posts/:id/view",
        name: "publicPost",
        component: PublicPost,
      },
      {
        path: "posts/:id/download/image",
        name: "downloadImage",
        component: DownloadImage,
      },
      {
        path: "audios",
        name: "audios",
        component: Audio,
      },
    ],
  },
  {
    path: "/reset-password",
    name: "reset-password-step1",
    component: ResetPasswordStep1,
  },
  {
    path: "/reset-password/:id",
    name: "reset-password-step2",
    component: ResetPasswordStep2,
  },
  { path: "/login", name: "login", component: Login },
  { path: "/register", name: "register", component: Register },
  { path: "*", component: NotFound },
];

export default routes;
