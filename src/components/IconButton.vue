<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";

const iconNameMap = {
  back: "keyboard_backspace",
  reverse: "swap_vert",
  shuffle: "shuffle",
  list: "format_list_bulleted",
  play: "play_circle_outline",
  pause: "pause_circle_outline",
  next: "skip_next",
  prev: "skip_previous",
  listening: "headphones",
  learn: "description",
  right: "chevron_right",
};

type IconName = keyof typeof iconNameMap;

export default defineComponent({
  name: "IconButton",
  props: {
    size: {
      type: String as PropType<"small" | "large">,
      default: "small",
    },
    color: {
      type: String as PropType<"black" | "red" | "gray">,
      default: "black",
    },
    iconName: {
      type: String as PropType<IconName>,
      required: true,
    },
  },
  emits: ["click"],
  setup() {
    return {
      iconNameMap,
    };
  },
});
</script>

<template>
  <div @click="$emit('click')" class="icon-button">
    <span :class="`icon-button__icon material-icons --${size} --${color}`">{{
      iconNameMap[iconName]
    }}</span>
  </div>
</template>

<style lang="scss" scoped>
@import "~/scss/main.scss";

.icon-button {
  display: inline-block;
  width: min-content;

  @include button-cursor;

  &__icon {
    &.--small {
      font-size: 2.4rem;
    }

    &.--large {
      font-size: 4.8rem;
    }

    &.--black {
      color: $black;
    }

    &.--red {
      color: $bright-red;
    }

    &.--gray {
      color: $gray;
    }
  }
}
</style>
