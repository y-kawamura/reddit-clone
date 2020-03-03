<template>
  <div id="app">
    <!-- <nav class="is-fixed-top navbar">
      <div class="nav-logo">
        Reddit Clone
      </div>
      <div class="nav-menu"></div>
    </nav> -->
    <nav class="navbar is-dark is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/#/">
          Reddit Clone
        </a>
        <div class="login-logout">
          <div class="navbar-item">
            <div v-if="!isLoggedIn">
              <a class="navbar-item button is-danger is-outlined" @click="login()">
                Login with Google
              </a>
            </div>
            <div v-if="isLoggedIn">
              <div class="avatar">
                <img :src="user.image">
                <span>{{ user.name }}</span>
                <a
                  class="button is-small is-danger is-outlined"
                  @click="logout()"
                >
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <router-view class="container main" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  methods: mapActions('auth', ['login', 'logout']),
  computed: mapState('auth', ['user', 'isLoggedIn']),
};
</script>

<style lang="scss">
.main {
  margin-top: 2rem;
}

.navbar-brand {
  width: 100%;
}

.login-logout {
  margin-left: auto;
  display: flex;
  align-items: center;
}

.avatar {
  display: flex;
  align-items: center;
}
.avatar img {
  border-radius: 50%;
}
.avatar span {
  margin: 0 1rem 0 0.5rem;
  font-size: 0.9rem;
  color: whitesmoke;
}

</style>
