export const zeroPadding = (no: number, digit: number = 3): string => {
  return ("0".repeat(digit) + no).slice(-digit);
};

export const clamp = (value: number, min: number, max: number) => {
  return value > max ? max : value < min ? min : value;
};
