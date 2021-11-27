<template>
  <div class="main">
    <p class="main__header">Hello World</p>
    <Book />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import Book from "./Book.vue";

export default defineComponent({
  components: {
    Book: Book,
  },
  setup() {
    console.log("hello world");
  },
});
</script>

<style scoped lang="scss">
.main {
  &__header {
    color: red;
  }
}
</style>
