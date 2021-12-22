import { Ports } from "~/adapter";

export const observeAuthState = (
  { firebase }: Ports,
  authorizedCallback: () => Promise<void>,
  unauthorizedCallback: () => Promise<void>
) => {
  firebase.observeAuthState(authorizedCallback, unauthorizedCallback);
};
