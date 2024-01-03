<template>
  <div id="app">
    <project-header @close="showDropdown" />
    <nav-bar />
    <snackbar />
    <router-view />
  </div>
</template>

<script>
import ProjectHeader from '@/components/header/ProjectHeader.vue';
import NavBar from '@/components/navBar/NavBar.vue';
import Snackbar from '@/components/snackbar/Snackbar.vue';

export default {
  components: { ProjectHeader, NavBar, Snackbar },
  data() {
    return {
      isShowDropdown: false,
    };
  },
  methods: {
    showDropdown() {
      this.isShowDropdown = !this.isShowDropdown;
    },
  },
};
</script>
