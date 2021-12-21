import { computed } from "vue";
import { Ports } from "~/adapter";
import { Filter } from "~/entities/filter";

export const useFilterForListening = ({ store, localStorage }: Ports) => {
  const storedFilter = localStorage.filterForListening;
  if (storedFilter) store.commit("setFilterForListening", storedFilter);

  const filterForListening = computed<Filter>(() => {
    return store.getters.filterForListening;
  });

  const setFilterForListening = (newFilter: Filter) => {
    localStorage.filterForListening = newFilter;
    store.commit("setFilterForListening", newFilter);
  };

  return { filterForListening, setFilterForListening };
};
