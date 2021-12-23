<script lang="ts">
import { computed, defineComponent } from "vue";
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
    const count = computed(
      () => filterWords(words, evaluations, filter.value).length
    );

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
      if (count.value === 0) return;
      router.push("/learn/problem");
    };

    return {
      count,
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
        <div class="main__text">
          タップして出題範囲を選択 <br /><span :class="{ '--red': count === 0 }"
            >該当数 {{ count }} 問</span
          >
        </div>
        <Table @update:data="updateFilter" :data="filter" />
      </div>
      <Button @click="start" :disabled="count === 0">Start</Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "~/scss/main.scss";

.learn {
  height: 100%;
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
    margin-bottom: 0.8rem;
    font-size: 1.6rem;
    text-align: center;
    line-height: 2.8rem;

    .--red {
      color: $pale-red;
    }
  }

  &__table {
    width: 100%;
    @include center-flex(column);
  }
}
</style>
