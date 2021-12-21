<script lang="ts">
import { defineComponent, PropType, computed } from "@vue/runtime-core";
import { zeroPadding } from "~/utils";
import {
  englishSentenceToDisplay,
  formatNo,
  formatSubNo,
  japaneseToDislay,
} from "~/entities/word";
import Character from "./Character.vue";
import Sentence from "./Sentence.vue";
import { Chapter, Word } from "~/firebase/types";
import { chapterMap } from "~/entities/chapter";

export default defineComponent({
  name: "Question",
  components: {
    Character,
    Sentence,
  },
  props: {
    // no: {
    //   type: Number,
    //   required: true,
    // },
    // subNo: {
    //   type: Number,
    //   required: true,
    // },
    // chapter: {
    //   type: String as PropType<Chapter>,
    //   required: true,
    // },
    word: {
      // refactor: word に依存しない
      type: Object as PropType<Word>,
      required: true,
    },
    showHeader: {
      type: Boolean,
      required: true,
    },
    showAnswer: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const header = computed(() => {
      const no = formatNo(props.word.no, props.word.chapter);
      const chapter = chapterMap[props.word.chapter];
      let ret = `${chapter} No.${no}`;
      if (props.word.chapter === "Multiple") {
        ret += ` - ${formatSubNo(props.word.sub_no)}`;
      }
      return ret;
    });
    const english = computed(() =>
      englishSentenceToDisplay(props.word.english.sentence, props.showAnswer)
    );
    const japanese = computed(() => japaneseToDislay(props.word.japanese));

    return {
      header,
      english,
      japanese,
    };
  },
});
</script>

<template>
  <div class="question">
    <div v-if="showHeader" class="question__header">{{ header }}</div>
    <div id="japanese" class="question__japanese">
      <Sentence :sentence="japanese" />
    </div>
    <div class="question__english">
      <Sentence :sentence="english" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "~/scss/main.scss";

.question {
  display: grid;
  grid-template:
    "header ..." calc(1px + 2.4rem)
    "... ..." 3.6rem
    "japanese japanese" 2.4rem
    "... ..." 3.6rem
    "english english" 2.4rem
    "... ..." 4rem
    / auto 1fr;
  justify-content: center;
  align-items: center;

  width: 90%;
  max-width: 40rem;
  padding: 0.8rem 1.2rem 0;

  border: 1px solid $black;
  border-radius: 1.2rem;

  &__header {
    grid-area: header;
    font-size: 1.8rem;
    font-weight: 600;
    padding: 0 0.4rem 0.6rem;
    border-bottom: 1px solid $black;
  }

  &__japanese {
    grid-area: japanese;
    font-weight: 500;
  }

  &__english {
    grid-area: english;
    font-weight: 400;
  }
}
</style>
