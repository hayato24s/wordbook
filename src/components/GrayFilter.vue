<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "GrayFilter",
});
</script>

<template>
  <div class="gray-filter"></div>
</template>

<style lang="scss" scoped>
@import "~/scss/main.scss";

.gray-filter {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  background: $black;
  opacity: 0.2;

  z-index: 5;
}
</style>
