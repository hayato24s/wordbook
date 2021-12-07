<script lang="ts">
import { defineComponent, PropType, computed } from "@vue/runtime-core";
import { DisplayedSentence } from "~/entities/word";
import Character from "~/components/Character.vue";
import { Context } from "vm";

const calculateTextWidth = (text: string): number => {
  const font = "normal 10px 'Noto Sans JP'";
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d") as Context;
  context.font = font;
  const { width } = context.measureText(text);
  return width;
};

export default defineComponent({
  name: "Sentence",
  components: {
    Character,
  },
  props: {
    sentence: {
      type: Array as PropType<DisplayedSentence>,
      required: true,
    },
  },
  setup({ sentence }) {
    const width = computed(() => {
      const text = sentence.reduce((text, { char }) => {
        text += char;
        return text;
      }, "");
      return calculateTextWidth(text);
    });

    const style = computed(() => ({
      fontSize: `min(calc((min(90vw, 40rem) - 2.6rem) / ${width.value} * 10), 2.4rem)`,
    }));

    return {
      style,
    };
  },
});
</script>

<template>
  <div class="sentence" :style="style">
    <template v-for="({ char, isRed }, i) in sentence" :key="i">
      <Character :color="isRed ? 'red' : 'black'">{{
        char === " " ? "&nbsp" : char
      }}</Character>
    </template>
  </div>
</template>

<style lang="scss" scoped>
@import "~/scss/main.scss";

.sentence {
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>
