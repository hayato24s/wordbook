import {
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
} from "firebase/auth";
import { Provider } from "~/entities/provider";

const auth = getAuth();

export const getUserId = () => {
  return auth.currentUser?.uid;
};

export const observeAuthState = (
  authorizedCallback: () => Promise<void>,
  unauthorizedCallback: () => Promise<void>
) => {
  onAuthStateChanged(auth, async (authUser) => {
    if (authUser) {
      await authorizedCallback();
    } else {
      await unauthorizedCallback();
    }
  });
};

export const trySignIn = (prov: Provider) => {
  const provider = new GoogleAuthProvider();
  return signInWithRedirect(auth, provider);
};

export const dealWithSignInResult = async (
  successfulCallback: (result: { uid: string; name: string }) => Promise<void>,
  failedCallback: () => Promise<void>
) => {
  await getRedirectResult(auth).then(async (result) => {
    if (result)
      await successfulCallback({
        uid: result.user.uid,
        name: result.user.displayName ?? "",
      });
    else await failedCallback();
  });
};
