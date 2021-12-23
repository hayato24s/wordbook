<script lang="ts">
import { defineComponent, ref, watch } from "@vue/runtime-core";
import AudioBar from "~/components/AudioBar.vue";
import IconButton from "~/components/IconButton.vue";
import SvgWrapper from "~/components/SvgWrapper.vue";
import { clamp } from "~/utils";

export default defineComponent({
  name: "Audio",
  props: {
    src: {
      type: String,
      required: true,
    },
    continuous: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    AudioBar,
    IconButton,
    SvgWrapper,
  },
  emits: ["change", "update:continuous"],
  setup(props, { emit }) {
    const audio = new Audio();
    const duration = ref(0);
    const currentTime = ref(0);
    const isPlay = ref(false);

    watch(
      () => props.src,
      (src) => {
        audio.src = src;
        audio.load();
      },
      { immediate: true }
    );

    watch(
      () => props.continuous,
      (continuous) => {
        if (continuous) play();
        else pause();
      }
    );

    // audio.currentTime が変更される（3秒スキップ）もしくは src が変更されるたび実行される.
    audio.oncanplay = () => {
      duration.value = audio.duration;
      if (props.continuous) play();
    };

    // audio.currentTime が変更されるたびに currentTime を更新する.
    audio.ontimeupdate = () => {
      if (audio.currentTime == audio.duration) {
        isPlay.value = false;
        emit("change", 1);
      }
      currentTime.value = audio.currentTime;
    };

    const play = () => {
      if (props.src === "") return;
      if (audio.currentTime === audio.duration) return;
      emit("update:continuous", true);
      audio.play();
      isPlay.value = true;
    };

    const pause = () => {
      audio.pause();
      isPlay.value = false;
    };

    const changeCurrentTime = (diff: number) => {
      const time = clamp(audio.currentTime + diff, 0, duration.value);
      audio.currentTime = time;
    };

    return {
      currentTime,
      duration,
      isPlay,
      play,
      pause,
      changeCurrentTime,
    };
  },
});
</script>

<template>
  <div class="audio">
    <AudioBar :currentTime="currentTime" :duration="duration" />
    <div class="audio__btn">
      <IconButton
        @click="$emit('change', -1)"
        size="large"
        color="red"
        iconName="prev"
      />
      <SvgWrapper
        @click="changeCurrentTime(-3)"
        size="large"
        color="red"
        iconName="replay"
      />
      <IconButton
        v-show="!isPlay"
        @click="play"
        size="large"
        color="red"
        iconName="play"
      />
      <IconButton
        v-show="isPlay"
        @click="pause"
        size="large"
        color="red"
        iconName="pause"
      />
      <SvgWrapper
        @click="changeCurrentTime(3)"
        size="large"
        color="red"
        iconName="forward"
      />
      <IconButton
        @click="$emit('change', 1)"
        size="large"
        color="red"
        iconName="next"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "~/scss/main.scss";

.audio {
  width: 100%;

  padding: 1.6rem 0 0.8rem;
  border-top: solid 1px $black;

  &__btn {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1.2rem;
    margin-top: 1.6rem;
  }
}
</style>
