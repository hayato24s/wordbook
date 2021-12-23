<script lang="ts">
import { defineComponent } from "vue";
import Footer from "~/components/Footer.vue";
import Header from "~/components/Header.vue";
import IconButton from "~/components/IconButton.vue";
import Table from "~/components/Table.vue";
import { usePorts } from "~/usecases";
import { getEvaluations } from "~/usecases/getEvaluations";
import { getLearningStatus } from "~/usecases/getLearningStatus";
import { getUser } from "~/usecases/getUser";
import { getWords } from "~/usecases/getWords";

export default defineComponent({
  name: "Home",
  components: {
    Footer,
    Header,
    IconButton,
    Table,
  },
  async setup() {
    const ports = usePorts();

    const { uid: userId, name: userName, photoUrl } = await getUser(ports);
    const words = await getWords(ports);
    const evalMap = await getEvaluations(ports, userId);
    const learningStatus = getLearningStatus(words, evalMap);

    return {
      userName,
      photoUrl,
      learningStatus,
    };
  },
});
</script>

<template>
  <div class="home">
    <Header>
      <template #text>ホーム</template>
    </Header>
    <div class="main">
      <img class="main__img" :src="photoUrl" />
      <div class="main__text">{{ userName }} さんの学習状況</div>
      <Table class="main__table" :data="learningStatus" />
    </div>

    <Footer>
      <IconButton
        @click="$router.push('/learn')"
        size="small"
        color="black"
        icon-name="learn"
      />
      <IconButton
        @click="$router.push('/listen')"
        size="small"
        color="black"
        icon-name="listening"
      />
    </Footer>
  </div>
</template>

<style lang="scss" scoped>
@import "~/scss/main.scss";

.home {
  height: 100%;
  // height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  flex-grow: 1;

  display: grid;
  justify-items: center;
  align-items: center;
  grid-template:
    "..." 2fr
    "img" auto
    "..." 1fr
    "text" auto
    "..." 1fr
    "table" auto
    "..." 2fr
    / 100%;

  &__img {
    border-radius: 50%;
    width: 10rem;
    height: 10rem;
    object-fit: contain;
    grid-area: img;
  }

  &__text {
    font-size: 2rem;
    grid-area: text;
  }

  &__table {
    grid-area: table;
  }
}
</style>
