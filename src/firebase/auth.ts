import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInAnonymously,
  signInWithRedirect,
  User as FirebaseUser,
} from "firebase/auth";
import { Provider } from "~/entities/provider";

const auth = getAuth();

export const getUserId = () => {
  return auth.currentUser?.uid;
};

export const observeAuthState = (
  authorizedCallback: (userInfo: {
    uid: string;
    name: string;
    photoUrl: string;
    isAnonymous: boolean;
  }) => Promise<void>,
  unauthorizedCallback: () => Promise<void>
) => {
  onAuthStateChanged(auth, async (authUser: FirebaseUser | null) => {
    if (authUser) {
      await authorizedCallback({
        uid: authUser.uid,
        name: authUser.displayName ?? "",
        photoUrl: authUser.photoURL ?? "",
        isAnonymous: authUser.isAnonymous,
      });
    } else {
      await unauthorizedCallback();
    }
  });
};

export const trySignIn = (prov: Provider) => {
  if (prov == "Anonymous") return signInAnonymously(auth);

  const provider = new GoogleAuthProvider();
  return signInWithRedirect(auth, provider);
};
