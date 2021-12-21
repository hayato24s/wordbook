<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";
import { Evaluation } from "~/firebase/types";

export default defineComponent({
  name: "EvaluationButton",
  props: {
    evaluation: {
      type: String as PropType<Exclude<Evaluation, "NotLearned">>,
      required: true,
    },
  },
  emits: ["click"],
  setup() {},
});
</script>

<template>
  <div
    @click="$emit('click', evaluation)"
    :class="`evaluation-button --${evaluation.toLowerCase()}`"
  >
    {{ evaluation }}
  </div>
</template>

<style lang="scss" scoped>
@import "~/scss/main.scss";

.evaluation-button {
  display: inline-block;
  width: 50%;
  max-width: 16rem;
  padding: 1.2rem 0;

  border-radius: 0.8rem;

  @include button-cursor;

  text-align: center;
  font-size: 1.6rem;
  color: $white;

  &.--excellent {
    background: $excellent;

    &:active {
      background: saturate($excellent, 20%);
    }
  }

  &.--good {
    background: $good;
    &:active {
      background: saturate($good, 20%);
    }
  }

  &.--poor {
    background: $poor;
    &:active {
      background: saturate($poor, 20%);
    }
  }

  transition: $transition-all;
}
</style>
