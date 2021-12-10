<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";
import { Evaluation, evaluations } from "~/entities/evaluation";
import { chapters, chapterMap, Chapter } from "~/entities/word";
import CheckBox from "~/components/CheckBox.vue";
import Face from "~/components/Face.vue";

export default defineComponent({
  name: "Table",
  components: {
    CheckBox,
    Face,
  },
  props: {
    filter: {
      type: Object as PropType<Record<Chapter, Record<Evaluation, boolean>>>,
      required: true,
    },
  },
  emits: ["update:filter"],
  setup() {
    return {
      evaluations,
      chapters,
      chapterMap,
    };
  },
});
</script>

<template>
  <div class="table">
    <div class="table__data" />
    <template v-for="evaluation in evaluations" :key="evaluation">
      <div class="table__data">
        <Face :name="evaluation" />
      </div>
    </template>
    <template v-for="(chapter, i) in chapters" :key="chapter">
      <div class="table__data">
        {{ chapterMap[chapter] }}
      </div>
      <template v-for="(evaluation, j) in evaluations" :key="i * 4 + j">
        <div
          @click="$emit('update:filter', { chapter, evaluation })"
          class="table__data"
        >
          <CheckBox :checked="filter[chapter][evaluation]" />
        </div>
      </template>
    </template>
  </div>
</template>

<style lang="scss" scoped>
@import "~/scss/main.scss";

.table {
  width: min(90%, 80rem);
  padding: 1px;

  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(7, 3.6rem);
  gap: 1px;

  background: $black;

  font-size: 1.6rem;

  &__data {
    background: $white;
    @include button-cursor;
    @include center-flex;
  }
}
</style>
