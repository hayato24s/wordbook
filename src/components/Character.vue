<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";

export default defineComponent({
  name: "Character",
  props: {
    color: {
      type: String as PropType<"black" | "red">,
      required: true,
    },
  },
  setup() {},
});
</script>

<template>
  <div :class="`character --${color}`">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@import "~/scss/main.scss";

.character {
  user-select: none;

  &.--black {
    color: $black;
  }
  &.--red {
    color: $orangeish-red;
  }
}
</style>
