<script lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { defineComponent } from "vue";
import Layout from "~/Layout.vue";

export default defineComponent({
  components: {
    Layout,
  },
  setup() {},
});
</script>

<template>
  <Suspense>
    <template #default>
      <Layout>
        <router-view />
      </Layout>
    </template>
  </Suspense>
</template>

<style lang="scss">
@import "~/scss/main.scss";
</style>
