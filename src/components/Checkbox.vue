<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "CheckBox",
  props: {
    checked: {
      type: Boolean,
      required: true,
    },
  },
  setup() {},
});
</script>

<template>
  <div class="check-box">
    <div v-show="checked" class="check-box__icon material-icons">check</div>
  </div>
</template>

<style lang="scss" scoped>
@import "~/scss/main.scss";

.check-box {
  width: 2.4rem;
  height: 2.4rem;
}
</style>
