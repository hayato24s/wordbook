import { Ports } from "~/adapter";

export const trySignOut = ({ firebase }: Ports) => {
  return firebase.trySignOut();
};
