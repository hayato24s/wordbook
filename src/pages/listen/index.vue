<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  onUpdated,
  ref,
  watch,
} from "vue";
import { useRouter } from "vue-router";
import Audio from "~/components/Audio.vue";
import Button from "~/components/Button.vue";
import Footer from "~/components/Footer.vue";
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
    Footer,
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

    /** word-list */
    let wordListDom: HTMLElement | undefined = undefined;
    let wordListBottom = 0;
    let wordItemDoms: HTMLElement[] | undefined = undefined;
    const setWordItemDoms = () => {
      if (!wordListDom) return;
      const children = wordListDom.children;
      wordItemDoms = Array.from(children).filter((child) =>
        child.classList.contains("word-list-item")
      ) as HTMLElement[];
    };
    onMounted(() => {
      wordListDom = document.getElementById("word-list") as HTMLElement;
      wordListBottom = wordListDom.offsetTop + wordListDom.offsetHeight;
      setWordItemDoms();
    });

    /** rendering words */
    onMounted(() => {
      initObserver();
      if (filteredWords.value.length == renderedWords.value.length) return;
      setTarget();
      observeTarget();
    });
    onUpdated(() => {
      if (filteredWords.value.length == renderedWords.value.length) return;
      setTarget();
      observeTarget();
    });

    const { uid: userId } = await getUser(ports);
    const words = await getWords(ports);
    const evalMap = await getEvaluations(ports, userId);
    const { filterForListening: filter } = useFilterForListening(ports);

    const filteredWords = ref<Word[]>(
      filterWords(words, evalMap, filter.value)
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
      return getSoundUrl(ports, currentWord.value.id);
    };
    const changeAudio = async (newIndex: number, newContinuous = true) => {
      if (length.value === 0) return;
      showAnswer.value = false;
      index.value = clamp(newIndex, 0, filteredWords.value.length - 1);
      src.value = await getSrc();
      continuous.value = newContinuous;
    };
    await changeAudio(0, false);

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

    /** word-list */
    const clickWordItemArrow = (i: number) => {
      changeAudio(i);
      isDetail.value = true;
    };

    /** progress-modal */
    const changeEvaluation = async (evaluation: Evaluation) => {
      updateEvaluations(ports, userId, {
        [modalWordId.value]: evaluation,
      });
      evalMap[modalWordId.value] = evaluation;
      modalWordId.value = "";
    };

    /** scroll in word-list */
    watch(
      () => index.value,
      () => {
        if (!wordListDom || !wordItemDoms) return;
        const el = wordItemDoms[index.value];
        if (!el) return;
        const bottom = el.offsetTop + el.offsetHeight;
        if (wordListBottom + wordListDom.scrollTop < bottom) {
          wordListDom.scrollTo(0, bottom - wordListBottom);
        }
      }
    );
    const scrollToTop = () => {
      if (!wordListDom) return;
      wordListDom.scrollTo(0, 0);
    };

    /** preload sound url */
    watch(
      () => index.value,
      (i) => {
        if (length.value === 0) return;
        const j = clamp(i + 5, i, length.value);
        while (i < j) {
          getSoundUrl(ports, filteredWords.value[i].id);
          i++;
        }
      }
    );

    /** progress modal */
    watch(
      () => modalWordId.value,
      (id) => {
        if (id) continuous.value = false;
      }
    );

    /** rendering words */
    const renderedWords = ref<Word[]>(filteredWords.value.slice(0, 100));
    const observer = ref<IntersectionObserver | undefined>();
    const target = ref<Element | undefined>();
    const callback: IntersectionObserverCallback = ([entry], observer) => {
      if (target.value == undefined || !entry.isIntersecting) return;
      const endIndex = clamp(
        renderedWords.value.length + 50,
        0,
        filteredWords.value.length
      );
      renderedWords.value = filteredWords.value.slice(0, endIndex);
      observer.unobserve(target.value);
    };
    const options: IntersectionObserverInit = {
      root: undefined,
      rootMargin: "0px",
      threshold: 0,
    };
    const initObserver = () => {
      if (!wordListDom) return;
      options.root = wordListDom;
      observer.value = new IntersectionObserver(callback, options);
    };
    const setTarget = () => {
      if (!wordItemDoms) return;
      setWordItemDoms();
      const idx = clamp(
        renderedWords.value.length - 20,
        0,
        wordItemDoms.length - 1
      );
      target.value = wordItemDoms[idx];
    };
    const observeTarget = () => {
      if (!observer.value || !target.value) return;
      observer.value.observe(target.value);
    };
    const reRenderWords = () => {
      renderedWords.value = filteredWords.value.slice(0, 100);
    };

    /** order of words */
    const order = ref<Order>("desc");
    const reverseWords = async () => {
      order.value = order.value === "asc" ? "desc" : "asc";
      filteredWords.value.sort(compareWords);
      if (order.value === "desc") filteredWords.value.reverse();
      reRenderWords();
      scrollToTop();
      await changeAudio(0, false);
    };
    const shuffleWords = async () => {
      order.value = "shuffle";
      shuffleArray(filteredWords.value);
      reRenderWords();
      scrollToTop();
      await changeAudio(0, false);
    };
    reverseWords();

    return {
      evalMap,
      filteredWords,
      renderedWords,
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
      clickWordItemArrow,
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

    <section v-if="!isDetail" id="word-list" class="word-list">
      <template v-for="(word, i) in renderedWords" :key="word.id">
        <div v-if="i !== 0" class="word-list__border"></div>
        <WordListItem
          @click="() => changeAudio(i)"
          @click-face="modalWordId = word.id"
          @click-arrow="clickWordItemArrow(i)"
          :no="word.no"
          :subNo="word.sub_no"
          :word="word.english.subject"
          :chapter="word.chapter"
          :evaluation="evalMap[word.id]"
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

    <Footer>
      <Audio
        @change="(i) => changeAudio(index + i)"
        :src="src"
        v-model:continuous="continuous"
      />
    </Footer>

    <GrayFilter @click="modalWordId = ''" v-show="modalWordId" />
    <ProgressModal v-show="modalWordId" @click="changeEvaluation" />
  </div>
</template>

<style lang="scss" scoped>
@import "~/scss/main.scss";

.listen {
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
}

.word-list {
  overflow-y: scroll;

  touch-action: pan-y;

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
