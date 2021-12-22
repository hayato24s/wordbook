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
        // pass firebase auth

        try {
          const permission = await checkPermission(ports);
          // exists user data in firestore
          router.push("/");
        } catch (e) {
          // not found user data in firestore

          await dealWithSignInResult(
            ports,
            async ({ uid, name, photoUrl }) => {
              // creat user data in firestore

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
              // no result

              router.push("/login");
            }
          );
        }

        loading.value = false;
      },
      async () => {
        // not pass firebase auth

        router.push("/login");
        loading.value = false;
      }
    );

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
  height: 100vh;

  &__loading {
    font-size: 2.4rem;
    @include center-absolute;
  }
}
</style>
