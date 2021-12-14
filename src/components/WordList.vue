<script lang="ts">
import { defineComponent, PropType, computed } from "@vue/runtime-core";
import { chapterMap, formatSubNo } from "~/entities/word";
import Face from "~/components/Face.vue";
import IconButton from "~/components/IconButton.vue";
import { zeroPadding } from "~/utils";
import { Chapter, Evaluation } from "~/firebase/types";

export default defineComponent({
  name: "WordList",
  components: {
    Face,
    IconButton,
  },
  props: {
    no: {
      type: Number,
      required: true,
    },
    subNo: {
      type: Number,
      default: 0,
    },
    word: {
      type: String,
      required: true,
    },
    chapter: {
      type: String as PropType<Chapter>,
      required: true,
    },
    evaluation: {
      type: String as PropType<Evaluation>,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["click-face", "click-arrow"],
  setup(props) {
    const digit = computed(() =>
      props.chapter === "Multiple" ? 2 : props.no < 1000 ? 3 : 4
    );

    return {
      digit,
      formatSubNo,
      chapterMap,
      zeroPadding,
    };
  },
});
</script>

<template>
  <div :class="{ 'word-list': true, '--active': isActive }">
    <div class="word-list__left">
      <div class="word-list__text">
        {{ chapterMap[chapter] }}
      </div>
      <div class="word-list__text">
        {{ zeroPadding(no, digit) }}
      </div>
      <div v-if="subNo !== 0" class="word-list__text">-</div>
      <div v-if="subNo !== 0" class="word-list__text">
        {{ formatSubNo(subNo) }}
      </div>
      <div class="word-list__text">-</div>
      <div class="word-list__text">{{ word }}</div>
    </div>
    <div class="word-list__right">
      <Face @click="$emit('click-face')" :name="evaluation" />
      <IconButton
        @click="$emit('click-arrow')"
        size="small"
        color="gray"
        iconName="right"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "~/scss/main.scss";

.word-list {
  width: 100%;
  height: 4.8rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 1.6rem;

  &.--active {
    color: $bright-red;
  }

  &__left {
    display: grid;
    grid-auto-flow: column;
    gap: 0.6rem;
    font-size: 1.6rem;
  }

  &__right {
    display: grid;
    grid-auto-flow: column;
    gap: 1.2rem;
  }
}
</style>
