<template>

  <MainPage />

</template>

<script>
import MainMenu from './components/MainMenu.vue'
import Taskboard from './components/Taskboard.vue'
import MainPage from '../src/pages/Main.vue'
import Login from '../src/pages/Login.vue'
export default {
  name: "App",
  components: {

    MainMenu, Taskboard, Login, MainPage
  },
  data() {
    return {

    };
  },
  async mounted() {
  }, methods: {
  }
};
</script>

</style>
