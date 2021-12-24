<script lang="ts">
import { defineComponent, PropType, computed } from "@vue/runtime-core";
import { chapterMap } from "~/entities/chapter";
import { formatSubNo } from "~/entities/word";
import Face from "~/components/Face.vue";
import IconButton from "~/components/IconButton.vue";
import { zeroPadding } from "~/utils";
import { Chapter, Evaluation } from "~/firebase/types";

export default defineComponent({
  name: "WordListItem",
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
  emits: ["click", "click-face", "click-arrow"],
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
  <div :class="{ 'word-list-item': true, '--active': isActive }">
    <div @click="$emit('click')" class="word-list-item__left">
      <div class="word-list-item__text">
        {{ chapterMap[chapter] }}
      </div>
      <div class="word-list-item__text">
        {{ zeroPadding(no, digit) }}
      </div>
      <div v-if="subNo !== 0" class="word-list-item__text">-</div>
      <div v-if="subNo !== 0" class="word-list-item__text">
        {{ formatSubNo(subNo) }}
      </div>
      <div class="word-list-item__text">-</div>
      <div class="word-list-item__text">{{ word }}</div>
    </div>
    <div class="word-list-item__right">
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

* {
  touch-action: pan-y;
}

.word-list-item {
  width: 100%;
  height: 4.8rem;

  display: flex;
  justify-content: space-between;
  align-items: stretch;

  padding: 0 1.6rem;

  @include button-cursor;
  touch-action: pan-y;

  &.--active {
    color: $bright-red;
  }

  &__left {
    flex-grow: 1;

    display: grid;
    grid-auto-flow: column;
    gap: 0.6rem;
    justify-content: start;
    align-items: center;
    font-size: 1.6rem;
  }

  &__right {
    display: grid;
    grid-auto-flow: column;
    gap: 1.2rem;
    align-items: center;
  }
}
</style>
