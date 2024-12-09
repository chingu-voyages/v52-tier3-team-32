import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertKeysToLowerCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((item) => convertKeysToLowerCase(item));
  } else if (obj && typeof obj === "object") {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      acc[key.toLowerCase()] = convertKeysToLowerCase(value);
      return acc;
    }, {} as Record<string, any>);
  }
  return obj; // Return the value if it's not an object/array
};
