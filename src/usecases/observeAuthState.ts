import { Ports } from "~/adapter";

export const observeAuthState = (
  { firebase }: Ports,
  authorizedCallback: () => void,
  unauthorizedCallback: () => void
) => {
  firebase.observeAuthState(authorizedCallback, unauthorizedCallback);
};
