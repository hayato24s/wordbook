<script lang="ts">
import { defineComponent, onMounted, ref } from "@vue/runtime-core";
import Button from "~/components/Button.vue";
import IconButton from "~/components/IconButton.vue";
import SvgWrapper from "~/components/SvgWrapper.vue";
import Face from "~/components/Face.vue";
import EvaluationButton from "~/components/EvaluationButton.vue";
import Question from "~/components/Question.vue";
import { Word } from "~/entities/word";
import { Context } from "vm";

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

    const word2: Word = {
      id: "uuid 002",
      no: 3,
      sub_no: 5,
      chapter: "Multiple",
      japanese: "返信用封筒（自分の'宛名が書かれた'封筒）",
      english: [
        {
          value: "a",
          beginning: "",
          end: "",
          is_answer: false,
        },
        {
          value: "address",
          beginning: "self-",
          end: "ed",
          is_answer: true,
        },
        {
          value: "envelope",
          beginning: "",
          end: "",
          is_answer: false,
        },
      ],
    };

    const word3: Word = {
      id: "uuid word3",
      no: 52,
      sub_no: 0,
      chapter: "Important",
      japanese: "彼女はハンドバッグから本を'取り出し'ている。",
      english: [
        {
          value: "She's",
          beginning: "",
          end: "",
          is_answer: false,
        },
        {
          value: "remov",
          beginning: "",
          end: "ing",
          is_answer: true,
        },
        {
          value: "a",
          beginning: "",
          end: "",
          is_answer: false,
        },
        {
          value: "book",
          beginning: "",
          end: "",
          is_answer: false,
        },
        {
          value: "from",
          beginning: "",
          end: "",
          is_answer: false,
        },
        {
          value: "her",
          beginning: "",
          end: "",
          is_answer: false,
        },
        {
          value: "handbag",
          beginning: "",
          end: ".",
          is_answer: false,
        },
      ],
    };

    const word4: Word = {
      id: "uuid word4",
      no: 364,
      sub_no: 0,
      chapter: "Beginning",
      japanese: "'人件'費",
      english: [
        {
          value: "labor",
          beginning: "",
          end: "",
          is_answer: true,
        },
        {
          value: "costs",
          beginning: "",
          end: "",
          is_answer: false,
        },
      ],
    };

    return {
      handleClick,
      word1,
      word2,
      word3,
      word4,
    };
  },
});
</script>

<template>
  <div class="preview" id="preview">
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
    <Question :word="word1" :showHeaer="false" :showAnswer="false" />
    <Question :word="word1" :showHeaer="true" showAnswer />
    <Question :word="word2" :showHeaer="true" :showAnswer="false" />
    <Question :word="word2" :showHeaer="false" :showAnswer="true" />
    <Question :word="word3" :showHeaer="true" :showAnswer="true" />
    <Question :word="word4" :showHeaer="true" :showAnswer="true" />
  </div>
</template>

<style lang="scss" scoped>
@import "~/scss/main.scss";

.preview {
  padding: 20px 0;
  display: grid;
  gap: 20px;
  justify-items: center;
}
</style>
