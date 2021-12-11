export const zeroPadding = (value: number): string => {
  if (value === 1000) return String(1000);
  return ("000" + String(value)).slice(-3);
};

export const clamp = (value: number, min: number, max: number) => {
  return value > max ? max : value < min ? min : value;
};
