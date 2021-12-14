<script lang="ts">
import { defineComponent, PropType, computed } from "@vue/runtime-core";
import { Evaluation } from "~/firebase/types";

const iconNameMap: Record<Evaluation, string> = {
  Excellent: "sentiment_very_satisfied",
  Good: "sentiment_satisfied",
  Poor: "sentiment_dissatisfied",
  NotLearned: "sentiment_neutral",
};

export default defineComponent({
  name: "Face",
  props: {
    name: {
      type: String as PropType<Evaluation>,
      required: true,
    },
  },
  emits: ["click"],
  setup(props) {
    const color = computed(() => {
      return props.name === "NotLearned"
        ? "not-learned"
        : props.name.toLowerCase();
    });
    return {
      color,
      iconNameMap,
    };
  },
});
</script>

<template>
  <div @click="$emit('click')" :class="`face material-icons --${color}`">
    {{ iconNameMap[name] }}
  </div>
</template>

<style lang="scss" scoped>
@import "~/scss/main.scss";

.face {
  display: inline-block;
  width: min-content;

  @include button-cursor;

  &.--excellent {
    color: $excellent;
  }

  &.--good {
    color: $good;
  }

  &.--poor {
    color: $poor;
  }

  &.--not-learned {
    color: $not-learned;
  }
}
</style>
