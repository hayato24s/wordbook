<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import Button from "~/components/Button.vue";
import IconButton from "~/components/IconButton.vue";
import SvgWrapper from "~/components/SvgWrapper.vue";
import Face from "~/components/Face.vue";
import EvaluationButton from "~/components/EvaluationButton.vue";
import Question from "~/components/Question.vue";
import { Word } from "~/entities/word";

export default defineComponent({
  name: "Preview",
  components: {
    Button: Button,
    IconButton: IconButton,
    SvgWrapper: SvgWrapper,
    Face: Face,
    EvaluationButton: EvaluationButton,
    Question: Question,
  },
  setup() {
    const handleClick = () => {
      console.log("clicked");
    };

    const word: Word = {
      id: "uuid",
      no: 1,
      sub_no: 0,
      chapter: "Beginning",
      japanese: "'とにかく'やってみよう",
      english: [
        {
          value: "Let's",
          end: "",
          is_answer: false,
        },
        {
          value: "try",
          end: "",
          is_answer: false,
        },
        {
          value: "anyway",
          end: ".",
          is_answer: true,
        },
      ],
    };

    return {
      handleClick,
      word,
    };
  },
});
</script>

<template>
  <div class="preview">
    <p>preview</p>
    <Button @click="handleClick()">Show Answer</Button>
    <IconButton size="small" color="black" iconName="back" />
    <IconButton size="small" color="black" iconName="reverse" />
    <IconButton size="small" color="black" iconName="shuffle" />
    <IconButton size="small" color="black" iconName="list" />
    <IconButton size="small" color="black" iconName="listening" />
    <IconButton size="small" color="black" iconName="learn" />
    <IconButton size="large" color="red" iconName="play" />
    <IconButton size="large" color="red" iconName="next" />
    <IconButton size="large" color="red" iconName="prev" />
    <IconButton size="small" color="gray" iconName="right" />
    <SvgWrapper size="large" color="red" iconName="forward" />
    <SvgWrapper size="large" color="red" iconName="replay" />
    <Face name="Excellent" />
    <Face name="Good" />
    <Face name="Poor" />
    <Face name="NotLearned" />
    <EvaluationButton evaluation="Excellent" />
    <EvaluationButton evaluation="Good" />
    <EvaluationButton evaluation="Poor" />
    <Question :word="word" />
  </div>
</template>

<style lang="scss" scoped>
@import "~/scss/main.scss";

.preview {
  padding: 20px;
  display: grid;
  gap: 20px;
}
</style>
