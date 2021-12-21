<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import Button from "~/components/Button.vue";
import Header from "~/components/Header.vue";
import IconButton from "~/components/IconButton.vue";
import Table from "~/components/Table.vue";
import { createFilter, Filter } from "~/entities/filter";
import { Chapter, Evaluation } from "~/firebase/types";
import { usePorts } from "~/usecases";
import { useFilterForListening } from "~/usecases/useFilterForListening";
import { cloneDeep } from "~/utils";

export default defineComponent({
  name: "Filter",
  components: {
    Button,
    Header,
    IconButton,
    Table,
  },
  setup() {
    const ports = usePorts();
    const router = useRouter();

    const {
      filterForListening: storedFilter,
      setFilterForListening: setFilter,
    } = useFilterForListening(ports);

    const filter = ref<Filter>(cloneDeep(storedFilter.value));

    const updateFilter = ({
      chapter,
      evaluation,
    }: {
      chapter: Chapter;
      evaluation: Evaluation;
    }) => {
      filter.value[chapter][evaluation] = !filter.value[chapter][evaluation];
    };

    const save = () => {
      setFilter(filter.value);
      filter.value = cloneDeep(storedFilter.value);
      router.push("/listen");
    };

    return {
      filter,
      updateFilter,
      save,
    };
  },
});
</script>

<template>
  <div class="filter">
    <Header>
      <template #left-btn>
        <IconButton
          @click="$router.back()"
          size="small"
          color="black"
          iconName="back"
        />
      </template>
      <template #text>音声(フィルター)</template>
    </Header>
    <div class="main">
      <div class="main__table">
        <div class="main__text">タップして出題範囲を選択</div>
        <Table @update:filter="updateFilter" :filter="filter" />
      </div>
      <Button @click="save">Save</Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "~/scss/main.scss";

.filter {
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
