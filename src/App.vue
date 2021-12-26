<script lang="ts">
import { defineComponent, onErrorCaptured, ref } from "vue";
import { useRouter } from "vue-router";
import Layout from "~/Layout.vue";
import { createFilter } from "./entities/filter";
import { NotPermittedError } from "./errors";
import { usePorts } from "./usecases";
import { createEvaluations } from "./usecases/createEvaluations";
import { createUser } from "./usecases/createUser";
import { getUser } from "./usecases/getUser";
import { observeAuthState } from "./usecases/observeAuthState";
import { useFilterForLearning } from "./usecases/useFilterForLearning";
import { useFilterForListening } from "./usecases/useFilterForListening";
import { useLoading } from "./usecases/useLoading";

export default defineComponent({
  components: {
    Layout,
  },
  setup() {
    const ports = usePorts();
    const router = useRouter();

    const { setLoading } = useLoading(ports);
    const { setFilterForLearning } = useFilterForLearning(ports);
    const { setFilterForListening } = useFilterForListening(ports);

    const error = ref<string>("");
    onErrorCaptured((e) => {
      error.value = e.message;
      return true;
    });

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
          } else {
            throw new NotPermittedError("You don't have access to this app.");
          }
        } catch (e) {
          if (e instanceof NotPermittedError) {
            error.value = e.message;
            setLoading(false);
            return;
          }

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
        }

        setLoading(false);
      },
      async () => {
        console.log("not pass firebase auth");

        await router.push("/login");
        setLoading(false);
      }
    );

    return {
      error,
    };
  },
});
</script>

<template>
  <Layout :error="error">
    <Suspense>
      <template #default>
        <router-view />
      </template>
    </Suspense>
  </Layout>
</template>

<style lang="scss">
@import "~/scss/main.scss";
</style>
