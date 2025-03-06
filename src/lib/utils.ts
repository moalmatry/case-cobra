import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const splitArray = <T>(array: Array<T>, numberParts: number) => {
  const result: Array<Array<T>> = [];

  for (let i = 0; i < array.length; i++) {
    const index = i % numberParts;

    if (!result[index]) {
      result[index] = [];
    }
    result[index].push(array[i]);
  }

  return result;
};
