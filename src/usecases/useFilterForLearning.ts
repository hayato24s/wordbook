import { computed } from "vue";
import { Ports } from "~/adapter";
import { Filter } from "~/entities/filter";

export const useFilterForLearning = ({ store, localStorage }: Ports) => {
  const storedFilter = localStorage.filterForLearning;
  if (storedFilter) store.commit("setFilterForLearning", storedFilter);

  const filterForLearning = computed<Filter>(
    () => store.getters.filterForLearning
  );

  const setFilterForLearning = (newFilter: Filter) => {
    localStorage.filterForLearning = newFilter;
    store.commit("setFilterForLearning", newFilter);
  };

  return { filterForLearning, setFilterForLearning };
};
