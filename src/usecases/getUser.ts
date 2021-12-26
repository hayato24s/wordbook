import { Ports } from "~/adapter";
import { UnauthorizedError } from "~/errors";
import { User } from "~/firebase/types";

export const getUser = async ({ firebase, store }: Ports) => {
  let user = store.getters.user as User | undefined;

  if (!user) {
    const userId = firebase.getUserId();
    if (!userId) throw new UnauthorizedError("未認証です");
    user = await firebase.getUser(userId);
    store.commit("setUser", user);
  }

  return user;
};
