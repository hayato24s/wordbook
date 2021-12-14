<script lang="ts">
import { defineComponent, reactive } from "vue";
import Button from "~/components/Button.vue";
import Header from "~/components/Header.vue";
import IconButton from "~/components/IconButton.vue";
import Table from "~/components/Table.vue";
import { chapters } from "~/entities/chapter";
import { evaluations } from "~/entities/evaluation";
import { Chapter, Evaluation } from "~/firebase/types";

export default defineComponent({
  name: "Learn",
  components: {
    Button,
    Header,
    IconButton,
    Table,
  },
  setup() {
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

    const handleClick = () => {
      console.log("clicked");
    };

    return {
      filter,
      updateFilter,
      handleClick,
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
      <Button @click="handleClick()">Start !</Button>
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
