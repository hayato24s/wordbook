<script lang="ts">
import { defineComponent } from "vue";
import { usePorts } from "~/usecases";
import { trySignIn } from "~/usecases/trySignIn";
import googleImg from "~/assets/google_btn.png";
import appleImg from "~/assets/apple_btn.png";
import twitterImg from "~/assets/twitter_btn.png";
import { Provider } from "~/entities/provider";

export default defineComponent({
  name: "Login",
  components: {},
  async setup() {
    const ports = usePorts();

    const startLogin = (provider: Provider) => {
      trySignIn(ports, provider);
    };

    return {
      startLogin,
      googleImg,
      appleImg,
      twitterImg,
    };
  },
});
</script>

<template>
  <div class="login">
    <div class="login__header">Welcome to Wordbook</div>
    <div class="login__msg">
      We’re so happy you’re here. You can learn english word for TOEIC.
    </div>
    <div class="login__sign-in sign-in">
      <div class="sign-in__border"></div>
      <div class="sign-in__text">Sign in</div>
      <div class="sign-in__border"></div>
    </div>
    <div class="login__btns btns">
      <img
        @click="() => startLogin('Google')"
        class="btns__img"
        :src="googleImg"
        height="56"
      />
      <!-- <img class="btns__img" :src="appleImg" height="52" />
      <img class="btns__img" :src="twitterImg" height="56" /> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "~/scss/main.scss";

.login {
  height: 100vh;

  display: grid;
  justify-items: center;
  align-items: center;
  grid-template:
    "..." 1fr
    "header" auto
    "..." 6rem
    "msg" auto
    "..." 8rem
    "sign-in" auto
    "..." 1.2rem
    "btns" 2fr
    "..." 1fr
    / 100%;

  &__header {
    font-size: 2.8rem;
    font-weight: bold;
    grid-area: header;
  }

  &__msg {
    padding: 0 4.8rem;
    font-size: 1.6rem;
    line-height: 2.2rem;
    grid-area: msg;
  }

  &__sign-in {
    width: 80%;
    grid-area: sign-in;
  }

  &__btns {
    grid-area: btns;
  }
}

.sign-in {
  display: flex;
  align-items: center;

  &__text {
    font-size: 2rem;
    font-weight: 500;
    padding: 0 1.2rem;
  }

  &__border {
    flex-grow: 1;

    height: 1px;
    background: $gray;
  }
}

.btns {
  display: grid;
  justify-items: center;
  gap: 2rem;

  &__img {
    @include button-cursor;
    object-fit: contain;
  }
}
</style>
