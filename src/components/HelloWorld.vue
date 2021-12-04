<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  setup() {
    console.log("hello world");
  },
});
</script>

<template>
  <div class="main">
    <p class="main__header">Hello World</p>
  </div>
</template>

<style scoped lang="scss">
.main {
  &__header {
    color: red;
  }
}
</style>
