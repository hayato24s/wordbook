<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { useRouter } from "vue-router";
import Audio from "~/components/Audio.vue";
import Button from "~/components/Button.vue";
import GrayFilter from "~/components/GrayFilter.vue";
import Header from "~/components/Header.vue";
import IconButton from "~/components/IconButton.vue";
import ProgressModal from "~/components/ProgressModal.vue";
import Question from "~/components/Question.vue";
import WordListItem from "~/components/WordListItem.vue";
import { compareWords } from "~/entities/word";
import { Evaluation, Word } from "~/firebase/types";
import { usePorts } from "~/usecases";
import { filterWords } from "~/usecases/filterWords";
import { getEvaluations } from "~/usecases/getEvaluations";
import { getSoundUrl } from "~/usecases/getSoundUrl";
import { getUser } from "~/usecases/getUser";
import { getWords } from "~/usecases/getWords";
import { updateEvaluations } from "~/usecases/updateEvaluations";
import { useFilterForListening } from "~/usecases/useFilterForListening";
import { clamp, shuffleArray } from "~/utils";

type Order = "asc" | "desc" | "shuffle";

export default defineComponent({
  name: "Listen",
  components: {
    Audio,
    Button,
    GrayFilter,
    Header,
    IconButton,
    ProgressModal,
    Question,
    WordListItem,
  },
  async setup() {
    const ports = usePorts();
    const router = useRouter();

    const { uid: userId } = await getUser(ports);
    const words = await getWords(ports);
    const evaluations = ref(await getEvaluations(ports, userId));
    const { filterForListening: filter } = useFilterForListening(ports);

    const filteredWords = ref<Word[]>(
      filterWords(words, evaluations.value, filter.value)
    );
    const length = computed(() => filteredWords.value.length);

    const index = ref(0);
    const currentWord = computed(() => filteredWords.value[index.value]);
    const isDetail = ref(false);
    const showAnswer = ref(false);
    const src = ref("");
    const continuous = ref(false);
    const modalWordId = ref("");

    /** audio */
    const getSrc = async () => {
      if (length.value === 0) return "";
      return getSoundUrl(ports, {
        no: filteredWords.value[index.value].no,
        sub_no: filteredWords.value[index.value].sub_no,
        chapter: filteredWords.value[index.value].chapter,
      });
    };
    const changeAudio = async (newIndex: number, newContinuous = true) => {
      if (length.value === 0) return;
      showAnswer.value = false;
      index.value = clamp(newIndex, 0, filteredWords.value.length - 1);
      src.value = await getSrc();
      continuous.value = newContinuous;
    };
    await changeAudio(0, false);

    /** order of words */
    const order = ref<Order>("desc");
    const reverseWords = async () => {
      order.value = order.value === "asc" ? "desc" : "asc";
      filteredWords.value.sort(compareWords);
      if (order.value === "desc") filteredWords.value.reverse();
      await changeAudio(0, false);
    };
    const shuffleWords = async () => {
      order.value = "shuffle";
      shuffleArray(filteredWords.value);
      await changeAudio(0, false);
    };
    reverseWords();

    /** header */
    const clickArrowBack = () => {
      if (isDetail.value) isDetail.value = false;
      else {
        continuous.value = false;
        router.push("/");
      }
    };
    const goToFilter = () => {
      router.push("/listen/filter");
      continuous.value = false;
    };

    const changeEvaluation = async (evaluation: Evaluation) => {
      updateEvaluations(ports, userId, {
        [modalWordId.value]: evaluation,
      });
      evaluations.value[modalWordId.value] = evaluation;
      modalWordId.value = "";
    };

    watch(
      () => modalWordId.value,
      (id) => {
        if (id) continuous.value = false;
      }
    );

    return {
      evaluations,
      filteredWords,
      src,
      index,
      changeAudio,
      currentWord,
      isDetail,
      showAnswer,
      goToFilter,
      clickArrowBack,
      continuous,
      reverseWords,
      shuffleWords,
      modalWordId,
      changeEvaluation,
    };
  },
});
</script>

<template>
  <div class="listen">
    <Header>
      <template #left-btn>
        <IconButton
          @click="clickArrowBack"
          size="small"
          color="black"
          iconName="back"
        />
      </template>
      <template #text>音声{{ !isDetail ? "（一覧）" : "" }}</template>
      <template v-if="!isDetail" #right-btn>
        <IconButton
          @click="reverseWords"
          size="small"
          color="black"
          iconName="reverse"
        />
        <IconButton
          @click="shuffleWords"
          size="small"
          color="black"
          iconName="shuffle"
        />
        <IconButton
          @click="goToFilter"
          size="small"
          color="black"
          iconName="list"
        />
      </template>
    </Header>

    <section v-if="!isDetail" class="word-list">
      <template v-for="(word, i) in filteredWords" :key="word.id">
        <div v-if="i !== 0" class="word-list__border"></div>
        <WordListItem
          @click="() => changeAudio(i)"
          @click-face="modalWordId = word.id"
          @click-arrow="isDetail = true"
          :no="word.no"
          :subNo="word.sub_no"
          :word="word.english.subject"
          :chapter="word.chapter"
          :evaluation="evaluations[word.id]"
          :isActive="word.id === currentWord.id"
        />
      </template>
    </section>

    <section v-else="isDetail" class="detail">
      <Question
        class="detail__question"
        :word="currentWord"
        showHeader
        :showAnswer="showAnswer"
      />
      <Button @click="showAnswer = true">Show Answer</Button>
    </section>

    <Audio
      @change="(i) => changeAudio(index + i)"
      :src="src"
      v-model:continuous="continuous"
    />
    <GrayFilter @click="modalWordId = ''" v-show="modalWordId" />
    <ProgressModal v-show="modalWordId" @click="changeEvaluation" />
  </div>
</template>

<style lang="scss" scoped>
@import "~/scss/main.scss";

.listen {
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
}

.word-list {
  overflow-y: scroll;

  &__border {
    width: 95%;
    height: 1px;
    margin-left: 5%;
    background: $gray;
  }
}

.detail {
  @include flex-evenly(column);
}
</style>
