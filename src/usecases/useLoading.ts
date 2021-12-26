import { computed } from "vue";
import { Ports } from "~/adapter";

export const useLoading = ({ store }: Ports) => {
  const loading = computed(() => store.getters.loading);
  const setLoading = (newLoading: boolean) => {
    store.commit("setLoading", newLoading);
  };

  return { loading, setLoading };
};
