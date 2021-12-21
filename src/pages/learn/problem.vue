<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import Button from "~/components/Button.vue";
import EvaluationButton from "~/components/EvaluationButton.vue";
import Header from "~/components/Header.vue";
import IconButton from "~/components/IconButton.vue";
import Question from "~/components/Question.vue";
import { Evaluation, Word } from "~/firebase/types";
import { usePorts } from "~/usecases";
import { filterWords } from "~/usecases/filterWords";
import { getEvaluations } from "~/usecases/getEvaluations";
import { getUser } from "~/usecases/getUser";
import { getWords } from "~/usecases/getWords";
import { updateEvaluations } from "~/usecases/updateEvaluations";
import { useFilterForLearning } from "~/usecases/useFilterForLearning";
import { shuffleArray } from "~/utils";

export default defineComponent({
  name: "Problem",
  components: {
    Button,
    EvaluationButton,
    Header,
    IconButton,
    Question,
  },
  async setup() {
    const ports = usePorts();
    const router = useRouter();
    const { uid: userId } = await getUser(ports);
    const words = await getWords(ports);
    const evaluations = await getEvaluations(ports, userId);
    const { filterForLearning: filter } = useFilterForLearning(ports);
    const filteredWords = filterWords(words, evaluations, filter.value);
    // BUG: words が 0 のとき
    if (filteredWords.length === 0) router.push("/learn");
    shuffleArray(filteredWords);

    const index = ref(0);
    const word = computed<Word>(() => filteredWords[index.value]);
    const showAnswer = ref(false);

    const goToNext = () => {
      if (index.value === filteredWords.length - 1) router.push("/learn");
      else {
        index.value++;
        showAnswer.value = false;
      }
    };

    const changeEvaluation = async (newEval: Evaluation) => {
      updateEvaluations(ports, userId, { [word.value.id]: newEval });
      goToNext();
    };

    return {
      word,
      showAnswer,
      goToNext,
      changeEvaluation,
    };
  },
});
</script>

<template>
  <div class="problem">
    <Header>
      <template #left-btn>
        <IconButton
          @click="$router.back()"
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
        :word="word"
        :showHeader="showAnswer"
        :showAnswer="showAnswer"
      />
      <div class="main__buttons">
        <Button v-if="!showAnswer" @click="showAnswer = true"
          >Show Answer</Button
        >
        <template v-if="showAnswer">
          <EvaluationButton @click="changeEvaluation" evaluation="Excellent" />
          <EvaluationButton @click="changeEvaluation" evaluation="Good" />
          <EvaluationButton @click="changeEvaluation" evaluation="Poor" />
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
