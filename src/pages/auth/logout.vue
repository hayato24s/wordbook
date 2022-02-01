<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import Button from "~/components/Button.vue";
import Header from "~/components/Header.vue";
import IconButton from "~/components/IconButton.vue";
import { usePorts } from "~/usecases";
import { trySignOut } from "~/usecases/trySignOut";

export default defineComponent({
  name: "Logout",
  components: {
    Button,
    Header,
    IconButton,
  },
  setup() {
    const ports = usePorts();
    const router = useRouter();

    const logout = async () => {
      await trySignOut(ports);
      router.push("/login");
    };

    return {
      logout,
    };
  },
});
</script>

<template>
  <div class="logout">
    <Header>
      <template #left-btn>
        <IconButton
          @click="$router.push('/')"
          size="small"
          color="black"
          iconName="back"
        />
      </template>
      <template #text>サインアウト</template>
    </Header>
    <div class="main">
      <div class="main__msg">Are you sure you want to sign out?</div>
      <Button @click="logout">Sing out</Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "~/scss/main.scss";

.logout {
  height: 100%;
  display: flex;
  flex-direction: column;

  .main {
    flex-grow: 1;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &__msg {
      font-size: $font-large;
      text-align: center;
      margin: -4rem 0 8rem;
    }
  }
}
</style>
