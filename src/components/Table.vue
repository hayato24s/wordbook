<script lang="ts">
import { defineComponent, PropType, computed } from "@vue/runtime-core";
import { evaluations } from "~/entities/evaluation";
import { chapterMap, chapters } from "~/entities/chapter";
import CheckBox from "~/components/CheckBox.vue";
import Face from "~/components/Face.vue";
import { Filter } from "~/entities/filter";
import { Chapter, Evaluation } from "~/firebase/types";

export default defineComponent({
  name: "Table",
  components: {
    CheckBox,
    Face,
  },
  props: {
    data: {
      type: Object as PropType<
        Filter | Record<Chapter, Record<Evaluation, number>>
      >,
      required: true,
    },
  },
  emits: ["update:data"],
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
          @click="$emit('update:data', { chapter, evaluation })"
          class="table__data"
        >
          <template v-if="typeof data[chapter][evaluation] === 'boolean'">
            <CheckBox :checked="(data[chapter][evaluation] as boolean)" />
          </template>
          <template v-else>
            {{ data[chapter][evaluation] }}
          </template>
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
