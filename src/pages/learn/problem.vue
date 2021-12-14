<script lang="ts">
import { defineComponent, ref } from "vue";
import Button from "~/components/Button.vue";
import EvaluationButton from "~/components/EvaluationButton.vue";
import Header from "~/components/Header.vue";
import IconButton from "~/components/IconButton.vue";
import Question from "~/components/Question.vue";
import { Word } from "~/entities/word";

export default defineComponent({
  name: "Problem",
  components: {
    Button,
    EvaluationButton,
    Header,
    IconButton,
    Question,
  },
  setup() {
    const showAnswer = ref(false);

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

    return {
      showAnswer,
      word1,
      handleClick,
    };
  },
});
</script>

<template>
  <div class="problem">
    <Header>
      <template #left-btn>
        <IconButton
          @click="$router.push('/')"
          size="small"
          color="black"
          iconName="back"
        />
      </template>
      <template #text>学習</template>
    </Header>
    <div class="main">
      <Question
        class="main__question"
        :word="word1"
        :showHeaer="false"
        :showAnswer="false"
      />
      <div class="main__buttons">
        <Button v-if="!showAnswer" @click="showAnswer = true"
          >Show Answer</Button
        >
        <template v-if="showAnswer">
          <EvaluationButton evaluation="Excellent" />
          <EvaluationButton evaluation="Good" />
          <EvaluationButton evaluation="Poor" />
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "~/scss/main.scss";

.problem {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  flex-grow: 1;
  position: relative;

  &__question {
    position: absolute;
    left: 50%;
    bottom: 50%;
    transform: translateX(-50%);
  }

  &__buttons {
    width: 100%;

    position: absolute;
    left: 50%;
    bottom: 25%;
    transform: translate(-50%, 50%);

    display: grid;
    justify-items: center;
    gap: 2rem;
  }
}
</style>
