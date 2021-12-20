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
  authorizedCallback: () => void,
  unauthorizedCallback: () => void
) => {
  onAuthStateChanged(auth, async (authUser) => {
    if (authUser) {
      authorizedCallback();
    } else {
      unauthorizedCallback();
    }
  });
};

export const trySignIn = (prov: Provider) => {
  const provider = new GoogleAuthProvider();
  return signInWithRedirect(auth, provider);
};

export const dealWithSignInResult = async (
  callback: (result: { uid: string; name: string }) => Promise<void>
) => {
  getRedirectResult(auth).then(async (result) => {
    if (!result) return;
    const uid = result.user.uid;
    const name = result.user.displayName ?? "";
    await callback({ uid, name });
  });
};
