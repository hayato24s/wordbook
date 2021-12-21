import { Ports } from "~/adapter";
import { Provider } from "~/entities/provider";

export const trySignIn = ({ firebase }: Ports, provider: Provider) => {
  return firebase.trySignIn(provider);
};
