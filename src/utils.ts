export const zeroPadding = (no: number, digit: number = 3): string => {
  return ("0".repeat(digit) + no).slice(-digit);
};

export const clamp = (value: number, min: number, max: number) => {
  return value > max ? max : value < min ? min : value;
};

export const checkObjectHasProperty = <T extends Record<string, any>>(
  obj: any,
  props: (keyof T)[]
): obj is Record<keyof T, any> => {
  return props.every((p) => obj[p] != undefined);
};

export const checkType = (
  value: any,
  type: "string" | "number" | "boolean"
): boolean => {
  return typeof value === type;
};

export const cloneDeep = <T>(obj: T, cloned: any = {}): T => {
  if (Array.isArray(obj)) {
    cloned = [...obj];
    obj.forEach((_, i) => cloneDeep(obj[i], cloned[i]));
  } else if (typeof obj === "object") {
    cloned = {
      ...obj,
    };
    (Object.keys(obj) as Array<keyof typeof obj>).forEach((k) =>
      cloneDeep(obj[k], cloned[k])
    );
  }
  return cloned;
};

export const shuffleArray = (arr: any[]) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
};
