<script lang="ts">
import { defineComponent, ref, reactive } from "@vue/runtime-core";
import Button from "~/components/Button.vue";
import IconButton from "~/components/IconButton.vue";
import SvgWrapper from "~/components/SvgWrapper.vue";
import Face from "~/components/Face.vue";
import EvaluationButton from "~/components/EvaluationButton.vue";
import Question from "~/components/Question.vue";
import { Chapter, chapters, Word } from "~/entities/word";
import Header from "~/components/Header.vue";
import Table from "~/components/Table.vue";
import CheckBox from "~/components/CheckBox.vue";
import Audio from "~/components/Audio.vue";
import AudioBar from "~/components/AudioBar.vue";
import WordList from "~/components/WordList.vue";
import GrayFilter from "~/components/GrayFilter.vue";
import ProgressModal from "~/components/ProgressModal.vue";
import { Evaluation, evaluations } from "~/entities/evaluation";
import src1 from "~/data/001.mp3";
import src2 from "~/data/002.mp3";
import src3 from "~/data/003.mp3";
import { clamp } from "~/utils";
import { db } from "~/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";

export default defineComponent({
  name: "Preview",
  components: {
    Button: Button,
    IconButton: IconButton,
    SvgWrapper: SvgWrapper,
    Face: Face,
    EvaluationButton: EvaluationButton,
    Question: Question,
    Header,
    Table,
    CheckBox,
    Audio,
    AudioBar,
    WordList,
    GrayFilter,
    ProgressModal,
  },
  async setup() {
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

    const checked = ref(true);

    const filter = reactive<Record<Chapter, Record<Evaluation, boolean>>>(
      chapters.reduce((obj1, chapter) => {
        obj1[chapter] = evaluations.reduce((obj2, evaluation) => {
          obj2[evaluation] = false;
          return obj2;
        }, {} as Record<Evaluation, boolean>);
        return obj1;
      }, {} as Record<Chapter, Record<Evaluation, boolean>>)
    );

    const updateFilter = ({
      chapter,
      evaluation,
    }: {
      chapter: Chapter;
      evaluation: Evaluation;
    }) => {
      filter[chapter][evaluation] = !filter[chapter][evaluation];
    };

    const sources = [src1, src2, src3];
    const index = ref(0);

    const changeAudio = (i: number) => {
      index.value = clamp(index.value + i, 0, sources.length - 1);
    };

    // try {
    //   const docRef = await addDoc(collection(db, "users"), {
    //     first: "Ada",
    //     last: "Lovelace",
    //     born: 1815,
    //   });
    //   console.log("Document written with ID: ", docRef.id);
    // } catch (e) {
    //   console.error("Error adding document: ", e);
    // }

    // const querySnapshot = await getDocs(collection(db, "users"));
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    // });

    const grayFilter = ref(false);

    return {
      handleClick,
      word1,
      word2,
      word3,
      word4,
      checked,
      filter,
      updateFilter,
      sources,
      index,
      changeAudio,
      grayFilter,
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
    <IconButton size="large" color="red" iconName="pause" />
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
    <Header>
      <template #left-btn>
        <IconButton size="small" color="black" iconName="back" />
      </template>
      <template #text>学習</template>
    </Header>
    <Header>
      <template #left-btn>
        <IconButton size="small" color="black" iconName="back" />
      </template>
      <template #text>音声（一覧）</template>
      <template #right-btn>
        <IconButton size="small" color="black" iconName="reverse" />
        <IconButton size="small" color="black" iconName="shuffle" />
        <IconButton size="small" color="black" iconName="list" />
      </template>
    </Header>
    <CheckBox @click="() => (checked = !checked)" :checked="checked" />
    <Table @update:filter="updateFilter" :filter="filter" />
    <AudioBar :currentTime="1" :duration="3" />
    <Audio @change="changeAudio" :src="sources[index]" />
    <WordList
      :no="1"
      word="anyway"
      chapter="Acceleration"
      evaluation="Excellent"
    />
    <WordList
      :no="1"
      :subNo="1"
      word="accommodate"
      chapter="Multiple"
      evaluation="NotLearned"
    />
    <GrayFilter v-show="grayFilter" />
    <button @click="grayFilter = !grayFilter">click to open filter</button>
    <ProgressModal />
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
