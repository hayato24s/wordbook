<script lang="ts">
import { defineComponent, ref } from "vue";
import Audio from "~/components/Audio.vue";
import Header from "~/components/Header.vue";
import IconButton from "~/components/IconButton.vue";
import WordList from "~/components/WordList.vue";
import src1 from "~/data/001.mp3";
import src2 from "~/data/002.mp3";
import src3 from "~/data/003.mp3";
import { clamp } from "~/utils";

export default defineComponent({
  name: "Listen",
  components: {
    Audio,
    Header,
    IconButton,
    WordList,
  },
  setup() {
    const sources = [src1, src2, src3];
    const index = ref(0);

    const changeAudio = (i: number) => {
      index.value = clamp(index.value + i, 0, sources.length - 1);
    };

    return {
      sources,
      index,
      changeAudio,
    };
  },
});
</script>

<template>
  <div class="listen">
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
    <div class="main">
      <WordList
        :no="1"
        word="anyway"
        chapter="Acceleration"
        evaluation="Excellent"
        :isActive="true"
      />
      <div class="main__border"></div>
      <WordList
        :no="1"
        :subNo="1"
        word="accommodate"
        chapter="Multiple"
        evaluation="NotLearned"
        :isActive="false"
      />
      <template v-for="i in 10" :key="i">
        <div class="main__border"></div>
        <WordList
          :no="1"
          word="anyway"
          chapter="Acceleration"
          evaluation="Excellent"
          :isActive="false"
        />
      </template>
    </div>
    <Audio @change="changeAudio" :src="sources[index]" />
  </div>
</template>

<style lang="scss" scoped>
@import "~/scss/main.scss";

.listen {
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
}

.main {
  overflow-y: scroll;

  &__border {
    width: 95%;
    height: 1px;
    margin-left: 5%;
    background: $gray;
  }
}
</style>
