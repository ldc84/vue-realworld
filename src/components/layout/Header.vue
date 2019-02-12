<template>
  <div>
    <a-menu
      v-model="current"
      mode="horizontal"
    >
      <a-menu-item key="menu-1">
        <router-link :to="{ name : 'home' }">Home</router-link>
      </a-menu-item>
      <a-menu-item key="menu-2" v-if="!isAuthenticated">
        <router-link :to="{ name : 'login' }">Login</router-link>
      </a-menu-item>
      <a-menu-item key="menu-3" v-if="!isAuthenticated">
        <router-link :to="{ name : 'register' }">Register</router-link>
      </a-menu-item>
      <a-menu-item key="menu-2" v-if="isAuthenticated">
        <router-link :to="{ name : 'article-edit' }">New Article</router-link>
      </a-menu-item>
      <a-menu-item key="menu-3" v-if="isAuthenticated">
        <router-link :to="{ name : 'settings' }">Settings</router-link>
      </a-menu-item>
      <a-menu-item key="menu-4" v-if="isAuthenticated">
        <router-link 
          :to="{ 
            name : 'profile',
            params : { name: currentUser.username }
          }"
        >
          {{ currentUser.username }}
        </router-link>
      </a-menu-item>
      <a-menu-item key="menu-5" v-if="isAuthenticated" @click="logout">
        Logout
      </a-menu-item>
    </a-menu>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { LOGOUT } from '@/store/actions.type'

export default {
  data(){
    return {
      current: ['mail']
    }
  },
  computed: {
    ...mapGetters([
      "currentUser", 
      "isAuthenticated"
    ])
  },
  methods: {
    logout() {
      this.$store.dispatch(LOGOUT).then(()=> {
        this.$router.push({ name: "home" });
        this.$message.success('Logout Success');
      })
    }
  }
}
</script>
