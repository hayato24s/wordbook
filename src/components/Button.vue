<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "Button",
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["click"],
});
</script>

<template>
  <div
    :class="`button  ${disabled ? '--disabled' : ''}`"
    @click="$emit('click')"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@import "~/scss/main.scss";

.button {
  display: inline-block;
  width: 70%;
  max-width: 30rem;
  padding: 2rem 0;

  border: solid 2px $pale-red;
  border-radius: 0.8rem;

  @include button-cursor;

  text-align: center;
  font-size: 2.4rem;
  font-weight: bold;
  color: $pale-red;

  transition: $transition-all;

  &:active {
    color: $white;
    background: $pale-red;
  }

  &.--disabled {
    border-color: $gray;
    color: $gray;

    &:active {
      color: $gray;
      background: $white;
    }
  }
}
</style>
