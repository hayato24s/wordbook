<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { usePorts } from "./usecases";
import { checkPermission } from "./usecases/checkPermission";
import { createEvaluations } from "./usecases/createEvaluations";
import { createUser } from "./usecases/createUser";
import { dealWithSignInResult } from "./usecases/dealWithSignInResult";
import { observeAuthState } from "./usecases/observeAuthState";

export default defineComponent({
  name: "Layout",
  components: {},
  async setup() {
    const router = useRouter();
    const ports = usePorts();

    const loading = ref(true);

    observeAuthState(
      ports,
      async () => {
        console.log("pass firebase auth");

        try {
          const permission = await checkPermission(ports);
          console.log("exists user data in firestore");

          router.push("/");
        } catch (e) {
          console.log("not found user data in firestore");

          await dealWithSignInResult(
            ports,
            async ({ uid, name, photoUrl }) => {
              console.log("creat user data in firestore");

              await createUser(ports, {
                uid,
                name,
                photoUrl,
                permission: true,
              });
              await createEvaluations(ports, uid);
              router.push("/");
            },
            async () => {
              console.log("no result");

              await router.push("/login");
            }
          );
        }

        loading.value = false;
      },
      async () => {
        console.log("not pass firebase auth");

        await router.push("/login");
        loading.value = false;
      }
    );

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
    <div v-if="loading" class="layout__loading">Loading ...</div>
    <div v-else class="layout__article"><slot /></div>
  </div>
</template>

<style lang="scss" scoped>
@import "~/scss/main.scss";

.layout {
  width: 100%;

  &__loading {
    font-size: 2.4rem;
    @include center-absolute;
  }

  &__article {
    height: calc(var(--vh, 1vh) * 100);
  }
}
</style>
