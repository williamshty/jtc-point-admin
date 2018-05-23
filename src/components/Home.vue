<template>
  <div>
    <div class="title">
      <div class="title__portal-group">
        <el-button class=""
        type="primary" plain round
        @click="whichDialogVisible = 'authority'">
        Sign In
        </el-button>
      </div>
    </div>
    <div class="header">
      <div class="header__text-box">
        <h1 class="heading-primary">
          <span class="heading-primary--main">JTC Points</span>
          <span class="heading-primary--sub">JTC Staff Welfare Points System</span>
        </h1>
        <!-- <a href="#" class="btn btn--white btn--animated"
        @click="showSignup()">
        Join Us
        </a> -->
      </div>
    </div>
    <!-- <market-place></market-place> -->
    <authority-login
    :show="authorityDialogVisible"
    @close="closeDialogs()">
    </authority-login>
  </div>
</template>
<script>
/* eslint-disable */
import AuthorityLogin from "./authority/AuthorityLogin.vue";
// import MarketPlace from "./MarketPlace.vue";

export default {
  data() {
    return {
      whichDialogVisible: "", // my, agency, police, authority
      signupVisible: false
    };
  },
  computed: {
    myDialogVisible() {
      return this.whichDialogVisible == "my";
    },
    agencyDialogVisible() {
      return this.whichDialogVisible == "agency";
    },
    authorityDialogVisible() {
      return this.whichDialogVisible == "authority";
    },
    policeDialogVisible() {
      return this.whichDialogVisible == "police";
    }
  },
  methods: {
    closeDialogs() {
      this.whichDialogVisible = "";
      this.signupVisible = false;
    },
    showSignup() {
      this.closeDialogs();
      this.signupVisible = true;
    }
  },
  components: {
    AuthorityLogin,
  },
  created() {
    if (typeof Storage !== "undefined") {
      // clear session storage when user navigates back to homepage
      if (sessionStorage.user) sessionStorage.clear;
    } else {
      this.$notify({
        title: "Warning",
        message: "Web Storage not supported by the browser..",
        type: "warning"
      });
    }
  }
};
</script>
<style scoped>
button.bg-transparent {
  background-color: Transparent !important;
}
</style>
