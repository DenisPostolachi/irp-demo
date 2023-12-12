<template>
  <div id="app">
    <project-header @close="showDropdown" />
    <nav-bar />
    <router-view />
  </div>
</template>

<script>
import ProjectHeader from '@/components/header/ProjectHeader.vue';
import NavBar from '@/components/navBar/NavBar.vue';

export default {
  components: { ProjectHeader, NavBar },
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
