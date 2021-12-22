import { Ports } from "~/adapter";

export const dealWithSignInResult = async (
  { firebase }: Ports,
  successfulCallback: (result: { uid: string; name: string }) => Promise<void>,
  failedCallback: () => Promise<void>
) => {
  await firebase.dealWithSignInResult(successfulCallback, failedCallback);
};
