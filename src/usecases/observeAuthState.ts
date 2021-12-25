import { Ports } from "~/adapter";

export const observeAuthState = (
  { firebase }: Ports,
  authorizedCallback: (userInfo: {
    uid: string;
    name: string;
    photoUrl: string;
    isAnonymous: boolean;
  }) => Promise<void>,
  unauthorizedCallback: () => Promise<void>
): void => {
  firebase.observeAuthState(authorizedCallback, unauthorizedCallback);
};
