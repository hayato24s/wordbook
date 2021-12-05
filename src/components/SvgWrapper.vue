<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";

export default defineComponent({
  name: "SvgWrapper",
  props: {
    size: {
      type: String as PropType<"small" | "large">,
      default: "small",
    },
    color: {
      type: String as PropType<"black" | "red">,
      default: "black",
    },
    iconName: {
      type: String as PropType<"forward" | "replay">,
    },
  },
  emits: ["click"],
});
</script>

<template>
  <div @click="$emit('click')" class="svg-wrapper">
    <svg
      v-if="iconName === 'forward'"
      :class="`svg-wrapper__svg svg --${size} --${color}`"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g class="svg__content">
        <g>
          <path
            d="M18,13c0,3.31-2.69,6-6,6s-6-2.69-6-6s2.69-6,6-6v4l5-5l-5-5v4c-4.42,0-8,3.58-8,8c0,4.42,3.58,8,8,8s8-3.58,8-8H18z"
          />
          <path
            transform="translate(2.0,0)"
            d="M10.06,15.38c-0.29,0-0.62-0.17-0.62-0.54H8.59c0,0.97,0.9,1.23,1.45,1.23c0.87,0,1.51-0.46,1.51-1.25 c0-0.66-0.45-0.9-0.71-1c0.11-0.05,0.65-0.32,0.65-0.92c0-0.21-0.05-1.22-1.44-1.22c-0.62,0-1.4,0.35-1.4,1.16h0.85 c0-0.34,0.31-0.48,0.57-0.48c0.59,0,0.58,0.5,0.58,0.54c0,0.52-0.41,0.59-0.63,0.59H9.56v0.66h0.45c0.65,0,0.7,0.42,0.7,0.64 C10.71,15.11,10.5,15.38,10.06,15.38z"
          />
        </g>
      </g>
    </svg>
    <svg
      v-if="iconName === 'replay'"
      :class="`svg-wrapper__svg svg --${size} --${color}`"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g class="svg__content">
        <g>
          <path
            d="M12,5V1L7,6l5,5V7c3.31,0,6,2.69,6,6s-2.69,6-6,6s-6-2.69-6-6H4c0,4.42,3.58,8,8,8s8-3.58,8-8S16.42,5,12,5z"
          />
          <g>
            <path
              transform="translate(2.0,0)"
              d="M9.56,13.49h0.45c0.21,0,0.37-0.05,0.48-0.16s0.16-0.25,0.16-0.43c0-0.08-0.01-0.15-0.04-0.22s-0.06-0.12-0.11-0.17 s-0.11-0.09-0.18-0.11s-0.16-0.04-0.25-0.04c-0.08,0-0.15,0.01-0.22,0.03s-0.13,0.05-0.18,0.1s-0.09,0.09-0.12,0.15 s-0.05,0.13-0.05,0.2H8.65c0-0.18,0.04-0.34,0.11-0.48s0.17-0.27,0.3-0.37s0.27-0.18,0.44-0.23s0.35-0.08,0.54-0.08 c0.21,0,0.41,0.03,0.59,0.08s0.33,0.13,0.46,0.23s0.23,0.23,0.3,0.38s0.11,0.33,0.11,0.53c0,0.09-0.01,0.18-0.04,0.27 s-0.07,0.17-0.13,0.25s-0.12,0.15-0.2,0.22s-0.17,0.12-0.28,0.17c0.24,0.09,0.42,0.21,0.54,0.39s0.18,0.38,0.18,0.61 c0,0.2-0.04,0.38-0.12,0.53s-0.18,0.29-0.32,0.39s-0.29,0.19-0.48,0.24s-0.38,0.08-0.6,0.08c-0.18,0-0.36-0.02-0.53-0.07 s-0.33-0.12-0.46-0.23s-0.25-0.23-0.33-0.38s-0.12-0.34-0.12-0.55h0.85c0,0.08,0.02,0.15,0.05,0.22s0.07,0.12,0.13,0.17 s0.12,0.09,0.2,0.11s0.16,0.04,0.25,0.04c0.1,0,0.19-0.01,0.27-0.04s0.15-0.07,0.2-0.12s0.1-0.11,0.13-0.18s0.04-0.15,0.04-0.24 c0-0.11-0.02-0.21-0.05-0.29s-0.08-0.15-0.14-0.2s-0.13-0.09-0.22-0.11s-0.18-0.04-0.29-0.04H9.56V13.49z"
            />
          </g>
        </g>
      </g>
    </svg>
  </div>
</template>

<style lang="scss" scoped>
@import "~/scss/main.scss";

.svg-wrapper {
  display: inline-block;
  width: min-content;

  @include button-cursor;
}

.svg {
  &.--small {
    width: 2.4rem;
    height: 2.4rem;
  }

  &.--large {
    width: 4.8rem;
    height: 4.8rem;

    .svg__content {
      transform: scale(2, 2);
    }
  }

  &.--black {
    fill: $black;
  }

  &.--red {
    fill: $bright-red;
  }
}
</style>
