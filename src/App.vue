<script lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  components: {},
  setup() {
    console.log("app");
  },
});
</script>

<template>
  <router-view />
</template>

<style lang="scss">
@import "~/scss/main.scss";
</style>
