<script lang="ts">
import { defineComponent, ref } from "vue";
import Audio from "~/components/Audio.vue";
import Button from "~/components/Button.vue";
import Header from "~/components/Header.vue";
import IconButton from "~/components/IconButton.vue";
import Question from "~/components/Question.vue";
import src1 from "~/data/001.mp3";
import src2 from "~/data/002.mp3";
import src3 from "~/data/003.mp3";
import { Word } from "~/firebase/types";
import { clamp } from "~/utils";

export default defineComponent({
  name: "Defail",
  components: {
    Audio,
    Button,
    Header,
    IconButton,
    Question,
  },
  setup() {
    const showAnswer = ref(false);

    const word1: Word = {
      id: "uuid 001",
      no: 1,
      sub_no: 0,
      chapter: "Beginning",
      japanese: "'とにかく'やってみよう",
      english: [
        {
          value: "Let's",
          beginning: "",
          end: "",
          is_answer: false,
        },
        {
          value: "try",
          beginning: "",
          end: "",
          is_answer: false,
        },
        {
          value: "anyway",
          beginning: "",
          end: ".",
          is_answer: true,
        },
      ],
    };

    const sources = [src1, src2, src3];
    const index = ref(0);

    const changeAudio = (i: number) => {
      index.value = clamp(index.value + i, 0, sources.length - 1);
    };

    return {
      showAnswer,
      word1,
      sources,
      index,
      changeAudio,
    };
  },
});
</script>

<template>
  <div class="detail">
    <Header>
      <template #left-btn>
        <IconButton
          @click="$router.back()"
          size="small"
          color="black"
          iconName="back"
        />
      </template>
      <template #text>音声</template>
    </Header>
    <div class="main">
      <Question
        class="main__question"
        :word="word1"
        showHeader
        :showAnswer="showAnswer"
      />
      <Button @click="showAnswer = true">Show Answer</Button>
    </div>
    <Audio @change="changeAudio" :src="sources[index]" />
  </div>
</template>

<style lang="scss" scoped>
@import "~/scss/main.scss";

.detail {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  flex-grow: 1;

  @include flex-evenly(column);
}
</style>
