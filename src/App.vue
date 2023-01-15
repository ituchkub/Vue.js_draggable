<template>

  <router-view></router-view>

</template>

<script>

export default {
  name: "App",
  components: {
  },
  data() {
    return {

    };
  },
  async mounted() {
    this.checkLogin()
  }, methods: {
    checkLogin() {
      let user = null;
      user = JSON.parse(sessionStorage.getItem('userInfo'));

      if (user) {
        this.login = 2
        this.checkcookie()
        //if (this.$router.currentRoute != "/home")
        console.log(this.$route.path)
        this.$router.push('/home')
      } else {
        this.login = 1
        sessionStorage.clear()
        //if (this.$router.currentRoute != "/login")
        this.$router.push('/login')
      }
    },
    checkcookie() {
      let _ = this;
      if (_.$cookies.isKey("token")) {
        //axios.defaults.baseURL = Vue.prototype.$config.apiUrl;

        let tempCookies = _.$cookies.get("userInfo")
        sessionStorage.setItem('userInfo', JSON.stringify(tempCookies))
        sessionStorage.setItem('token', _.$cookies.get("token"))
        sessionStorage.setItem('SessionEmpID', _.$cookies.get("SessionEmpID"))
        sessionStorage.setItem('displayName', _.$cookies.get("displayName"))
        sessionStorage.setItem('lgName', _.$cookies.get("lgName"))
        sessionStorage.setItem('lgSurname', _.$cookies.get("lgSurname"))

      } else {
        //axios.defaults.baseURL = Vue.prototype.$config.apiUrlAD;

        sessionStorage.clear()
        localStorage.clear()
      }
    }
  }
};
</script>

</style>
