<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { createFilter } from "./entities/filter";
import { usePorts } from "./usecases";
import { createEvaluations } from "./usecases/createEvaluations";
import { createUser } from "./usecases/createUser";
import { getUser } from "./usecases/getUser";
import { observeAuthState } from "./usecases/observeAuthState";
import { useFilterForLearning } from "./usecases/useFilterForLearning";
import { useFilterForListening } from "./usecases/useFilterForListening";

export default defineComponent({
  name: "Layout",
  components: {},
  async setup() {
    const router = useRouter();
    const ports = usePorts();

    const { setFilterForLearning } = useFilterForLearning(ports);
    const { setFilterForListening } = useFilterForListening(ports);

    const page = ref<"default" | "loading" | "permission">("loading");

    observeAuthState(
      ports,
      async ({ uid, name, photoUrl, isAnonymous }) => {
        console.log("pass firebase auth");

        try {
          const user = await getUser(ports);
          console.log("exists user data in firestore");

          if (user.permission) {
            console.log("permitted");
            await router.push("/");
            page.value = "default";
          } else {
            console.log("not permitted");
            page.value = "permission";
          }
        } catch (e) {
          console.log("not found user data in firestore");

          await createUser(ports, {
            uid,
            name: isAnonymous ? "Guest" : name,
            photoUrl,
            permission: true,
          });
          await createEvaluations(ports, uid);
          console.log("created user data in firestore");

          // initialize filter
          setFilterForLearning(createFilter());
          setFilterForListening(createFilter());

          await router.push("/");
          page.value = "default";
        }
      },
      async () => {
        console.log("not pass firebase auth");

        await router.push("/login");
        page.value = "default";
      }
    );

    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    window.addEventListener("load", setVh);
    window.addEventListener("resize", setVh);

    return {
      page,
    };
  },
});
</script>

<template>
  <div class="layout">
    <div v-if="page === 'loading'" class="layout__msg">Loading...</div>
    <div v-if="page === 'permission'" class="layout__msg">
      You don't have access to this app.
    </div>
    <div v-if="page === 'default'" class="layout__article"><slot /></div>
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
