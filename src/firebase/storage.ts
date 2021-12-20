import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { zeroPadding } from "~/utils";
import { firebaseApp } from "./app";
import { Word } from "./types";

const storage = getStorage(firebaseApp);

export const getSoundUrl = async ({
  no,
  sub_no,
  chapter,
}: Pick<Word, "no" | "sub_no" | "chapter">): Promise<string> => {
  let path = "sounds/";

  if (chapter === "Important") {
    path += `important/${zeroPadding(no, 3)}`;
  } else if (chapter === "Multiple") {
    path += `multiple/${zeroPadding(no, 3)}-${sub_no}`;
  } else {
    const start = zeroPadding(Math.floor((no - 1) / 100) * 100 + 1, 3);
    const end = zeroPadding(
      Math.floor((no - 1) / 100) * 100 + 100,
      no < 901 ? 3 : 4
    );
    path += `${start}-${end}/${zeroPadding(no, no < 1000 ? 3 : 4)}`;
  }

  path += ".mp3";

  const soundRef = ref(storage, path);
  const url = await getDownloadURL(soundRef);

  return url;
};
