import { Filter } from "~/entities/filter";

export class LocalStorage {
  private filterForLearningKey = "fliterForLearning";
  private filterForListeningKey = "fliterForListening";

  get filterForLearning(): Filter | undefined {
    const storedFilter = localStorage.getItem(this.filterForLearningKey);
    return storedFilter ? JSON.parse(storedFilter) : undefined;
  }

  set filterForLearning(filter: Filter | undefined) {
    if (filter == undefined) localStorage.removeItem(this.filterForLearningKey);
    else
      localStorage.setItem(this.filterForLearningKey, JSON.stringify(filter));
  }

  get filterForListening(): Filter | undefined {
    const storedFilter = localStorage.getItem(this.filterForListeningKey);
    return storedFilter ? JSON.parse(storedFilter) : undefined;
  }

  set filterForListening(filter: Filter | undefined) {
    if (filter == undefined)
      localStorage.removeItem(this.filterForListeningKey);
    else
      localStorage.setItem(this.filterForListeningKey, JSON.stringify(filter));
  }
}

const storage = new LocalStorage();

export const useLocalStorage = () => {
  return storage;
};
