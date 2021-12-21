import { Ports } from "~/adapter";
import { User } from "~/firebase/types";

export const createUser = async ({ firebase }: Ports, user: User) => {
  await firebase.createUser(user);
};
