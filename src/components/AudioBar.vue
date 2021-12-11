<script lang="ts">
import { defineComponent, computed } from "@vue/runtime-core";

const timeToDisplay = (time: number): string =>
  `0:${("00" + Math.floor(time)).slice(-2)}`;

export default defineComponent({
  name: "AudioBar",
  props: {
    currentTime: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const ratio = computed(
      () => `${(props.currentTime / props.duration) * 100}%`
    );
    const displayTime = computed(() => ({
      currentTime: timeToDisplay(props.currentTime),
      leftTime: timeToDisplay(props.duration - props.currentTime),
    }));

    return {
      ratio,
      displayTime,
    };
  },
});
</script>

<template>
  <div class="audio-bar">
    <div class="audio-bar__time">{{ displayTime.currentTime }}</div>
    <div class="audio-bar__bar">
      <div class="audio-bar__bar--red" :style="{ width: ratio }"></div>
      <div class="audio-bar__circle" :style="{ left: ratio }"></div>
    </div>
    <div class="audio-bar__time">{{ displayTime.leftTime }}</div>
  </div>
</template>

<style lang="scss" scoped>
@import "~/scss/main.scss";

.audio-bar {
  width: 100%;
  @include center-flex;

  &__time {
    padding: 0 1.6rem;
    font-size: 1.2rem;
    user-select: none;
  }

  &__bar {
    position: relative;
    flex-grow: 1;
    height: 0.2rem;
    background: $gray;

    &--red {
      position: absolute;
      height: 0.2rem;
      background: $bright-red;
    }
  }

  &__circle {
    width: 0.8rem;
    height: 0.8rem;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: $bright-red;
  }
}
</style>
