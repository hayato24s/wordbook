<script lang="ts">
import { defineComponent } from "vue";
import { usePorts } from "./usecases";
import { useLoading } from "./usecases/useLoading";

export default defineComponent({
  name: "Layout",
  props: {
    error: {
      type: String,
      default: "",
    },
  },
  setup() {
    const ports = usePorts();
    const { loading } = useLoading(ports);

    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    window.addEventListener("load", setVh);
    window.addEventListener("resize", setVh);

    return {
      loading,
    };
  },
});
</script>

<template>
  <div class="layout">
    <div v-if="loading || error" class="layout__msg">
      <template v-if="error">{{ error }}</template>
      <template v-else> Loading... </template>
    </div>
    <div v-else class="layout__article">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "~/scss/main.scss";

.layout {
  width: 100%;

  &__msg {
    width: 80%;

    @include center-absolute;

    text-align: center;
    font-size: 2.4rem;
    line-height: 3.2rem;
  }

  &__article {
    height: calc(var(--vh, 1vh) * 100);
  }
}
</style>
