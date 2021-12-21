<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import Button from "~/components/Button.vue";
import Header from "~/components/Header.vue";
import IconButton from "~/components/IconButton.vue";
import Table from "~/components/Table.vue";
import { Chapter, Evaluation } from "~/firebase/types";
import { usePorts } from "~/usecases";
import { filterWords } from "~/usecases/filterWords";
import { getEvaluations } from "~/usecases/getEvaluations";
import { getUser } from "~/usecases/getUser";
import { getWords } from "~/usecases/getWords";
import { useFilterForLearning } from "~/usecases/useFilterForLearning";
import { cloneDeep } from "~/utils";

export default defineComponent({
  name: "Learn",
  components: {
    Button,
    Header,
    IconButton,
    Table,
  },
  async setup() {
    const ports = usePorts();
    const router = useRouter();

    const { uid: userId } = await getUser(ports);
    const words = await getWords(ports);
    const evaluations = await getEvaluations(ports, userId);
    const { filterForLearning: filter, setFilterForLearning: setFilter } =
      useFilterForLearning(ports);

    const updateFilter = ({
      chapter,
      evaluation,
    }: {
      chapter: Chapter;
      evaluation: Evaluation;
    }) => {
      const newFilter = cloneDeep(filter.value);
      newFilter[chapter][evaluation] = !filter.value[chapter][evaluation];
      setFilter(newFilter);
    };

    const start = () => {
      const filteredWords = filterWords(words, evaluations, filter.value);
      if (filteredWords.length === 0) return;
      router.push("/learn/problem");
    };

    return {
      filter,
      updateFilter,
      start,
    };
  },
});
</script>

<template>
  <div class="learn">
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
      <div class="main__table">
        <div class="main__text">タップして出題範囲を選択</div>
        <Table @update:filter="updateFilter" :filter="filter" />
      </div>
      <Button @click="start">Start !</Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "~/scss/main.scss";

.learn {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  &__text {
    margin-bottom: 2.4rem;
    font-size: 1.6rem;
  }

  &__table {
    width: 100%;
    @include center-flex(column);
  }
}
</style>
