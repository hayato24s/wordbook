<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "Footer",
});
</script>

<template>
  <div class="footer">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@import "~/scss/main.scss";

.footer {
  width: 100%;
  min-height: 4.8rem;

  display: flex;
  justify-content: space-around;
  align-items: center;

  border-top: solid 1px $black;
}
</style>
