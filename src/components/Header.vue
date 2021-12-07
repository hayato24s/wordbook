<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "Header",
});
</script>

<template>
  <div class="header">
    <div class="header__left-btn">
      <slot name="left-btn" />
    </div>
    <div class="header__text">
      <slot name="text" />
    </div>
    <div class="header__right-btn">
      <slot name="right-btn" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "~/scss/main.scss";

.header {
  width: 100%;
  height: 4.8rem;
  padding: 0 1.2rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  position: relative;

  border-bottom: solid 1px $black;

  &__text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    font-size: 1.6rem;
    user-select: none;
  }

  &__right-btn {
    display: grid;
    grid-auto-flow: column;
    gap: 0.8rem;
  }
}
</style>
