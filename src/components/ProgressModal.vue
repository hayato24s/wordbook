<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import Face from "~/components/Face.vue";
import { evaluations } from "~/entities/evaluation";

export default defineComponent({
  name: "ProgressModal",
  components: {
    Face,
  },
  emits: ["click"],
  setup() {
    return {
      evaluations,
    };
  },
});
</script>

<template>
  <div class="progress-modal">
    <div class="progress-modal__text">select progress</div>
    <div class="progress-modal__faces">
      <template v-for="evaluation in evaluations" :key="evaluation">
        <Face @click="$emit('click', evaluation)" :name="evaluation" />
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "~/scss/main.scss";

.progress-modal {
  width: 60%;
  max-width: 40rem;
  padding: 2.4rem;

  @include center-fixed;

  background: $white;

  border: 1px solid $black;
  border-radius: 1.2rem;

  z-index: 10;

  &__text {
    margin-bottom: 2.4rem;
    font-size: 1.6rem;
    text-align: center;
    user-select: none;
  }

  &__faces {
    max-width: 20rem;
    margin: 0 auto;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
