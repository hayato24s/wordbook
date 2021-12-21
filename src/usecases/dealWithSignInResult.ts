import { Ports } from "~/adapter";

export const dealWithSignInResult = async (
  { firebase }: Ports,
  callback: (result: { uid: string; name: string }) => Promise<void>
) => {
  firebase.dealWithSignInResult(callback);
};
